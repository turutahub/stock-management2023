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

    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody OrderRequest request) {
        service.insertOrder(request.toOrderModel());
    }

    @GetMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public OrderModel get(@PathVariable int foodId) {
        return service.getById(foodId);
    }

    @PutMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable int foodId, @RequestBody OrderRequest request) {
        service.updateOrder(request.toOrderModel(foodId));
    }

    @DeleteMapping(value = "/{foodId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int foodId) {
        service.deleteOrder(foodId);
    }

    public OrderController(OrderService service) {
        this.service = service;
    }
}
