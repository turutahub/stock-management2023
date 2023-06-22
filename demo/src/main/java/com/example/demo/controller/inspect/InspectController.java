package com.example.demo.controller.inspect;

import com.example.demo.controller.order.OrderController;
import com.example.demo.model.InspectModel;
import com.example.demo.model.OrderModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/inspect")
public class InspectController {
    private final MainService service;

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InspectModel> getInspection() {
        return service.getAllInspection();
    }

    @GetMapping(value = "/get")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderModel> getUnInspected() {
        return service.getUnInspected();
    }

    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void insert(@RequestBody InspectRequest request) {
        service.insertInspection(request);
    }


    @GetMapping(value = "/{foodId}/{day}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public InspectModel getById(@PathVariable int foodId, @PathVariable String day) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(day, formatter);
        return service.getCheckedInspection(foodId, date);
    }


    @PutMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody InspectRequest request) {
        service.updateInspection(request);
    }

    public InspectController(MainService service) {
        this.service = service;
    }
}
