package com.example.demo.service;

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
    /*public void insertOrder(OrderModel model) {
        repository.insertOrder(model);
    }
    public OrderModel getById(int foodId) {
        return repository.getById(foodId);
    }
    public void updateOrder(OrderModel model) {
        repository.updateOrder(model);
    }
    public void deleteOrder(int foodId) {
        repository.deleteOrder(foodId);
    }*/

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
