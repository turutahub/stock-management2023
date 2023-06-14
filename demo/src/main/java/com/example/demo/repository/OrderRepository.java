package com.example.demo.repository;

import com.example.demo.model.OrderModel;

import java.util.List;

public interface OrderRepository {
    List<OrderModel> getAll();
    void insertOrder(OrderModel model);
    OrderModel getById(int foodId);
    void updateOrder(OrderModel model);
    void deleteOrder(int foodId);
}
