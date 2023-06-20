package com.example.demo.controller.order;

import com.example.demo.model.OrderModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
        service.insertInspection(request);
    }

    @GetMapping(value = "/get", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisterModel> getUnordered() {
        return service.getUnordered();
    }


    public OrderController(MainService service) {
        this.service = service;
    }
}
