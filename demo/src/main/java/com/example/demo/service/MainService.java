package com.example.demo.service;

import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.InspectModel;
import com.example.demo.model.OrderModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.model.StockModel;
import com.example.demo.repository.MainRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MainService {
    private final MainRepository repository;

    public MainService(MainRepository repository) {
        this.repository = repository;
    }

    public List<RegisterModel> getAllFood() {
        return repository.getAllFood();
    }

    public void registerFood(RegisterModel model) {
        repository.registerFood(model);
    }

    public RegisterModel getById(int foodId) {
        return repository.getById(foodId);
    }

    public void updateFood(RegisterModel model) {
        repository.updateFood(model);
    }
    public void deleteFood(int foodId) {
        repository.deleteFood(foodId);
    }


    public List<OrderModel> getAllOrder() {
        return repository.getAllOrder();
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


    /*public List<StockModel> getAllStock() {
        return repository.getAllStock();
    }


    public List<InspectModel> getAllInspect() {
        return repository.getAllInspect();
    }*/
}
