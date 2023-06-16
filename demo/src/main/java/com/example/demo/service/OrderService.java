package com.example.demo.service;

import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.OrderModel;
import com.example.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderService {
    private final OrderRepository repository;

    public List<OrderModel> getAll() {
        return repository.getAll();
    }
    public void insertOrder(int foodId, OrderRequest request) {
        repository.insertOrder(foodId, request);
    }
    /*public OrderModel getById(int foodId) {
        return repository.getById(foodId);
    }
    public void updateOrder(OrderModel model) {
        repository.updateOrder(model);
    }*/

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
