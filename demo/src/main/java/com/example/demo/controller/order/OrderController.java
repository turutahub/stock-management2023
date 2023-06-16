package com.example.demo.controller.order;

import com.example.demo.model.OrderModel;
import com.example.demo.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService service;

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderModel> getOrder() {
        return service.getAll();
    }

    @PostMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@PathVariable int foodId, @RequestBody OrderRequest request) {
        service.insertOrder(foodId, request);
    }


    public OrderController(OrderService service) {
        this.service = service;
    }
}
