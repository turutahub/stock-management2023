package com.example.demo.repository;

import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.OrderModel;

import java.util.List;

public interface OrderRepository {
    List<OrderModel> getAll();
    void insertOrder(int foodId, OrderRequest request);
    //OrderModel getById(int foodId);
    //void updateOrder(OrderModel model);
}
