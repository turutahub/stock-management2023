package com.example.demo.controller.order;

import com.example.demo.model.OrderModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final MainService service;

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderModel> getOrder() {
        return service.getAllOrder();
    }

    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody OrderRequest request) {
        service.insertOrder(request);
    }

    @GetMapping(value = "/get", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisterModel> getUnordered() {
        return service.getUnordered();
    }

    @GetMapping(value = "/{foodId}/{day}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public OrderModel getCheckedOrder(@PathVariable int foodId, @PathVariable String day) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(day, formatter);
        return service.getCheckedOrder(foodId, date);
    }

    @PutMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody OrderRequest request) {
        service.updateOrder(request);
        LocalDate day = service.getByIdDeliveryDay(request.getFoodId(), request.getDay());
        int insNum = service.getByIdInsNum(request.getFoodId(), day);
        int insInsufficient = request.getImpNum() - insNum;
        service.updateIns(insNum, insInsufficient, request.getFoodId(), day);
    }

    public OrderController(MainService service) {
        this.service = service;
    }
}
