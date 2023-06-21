package com.example.demo.service;

import com.example.demo.controller.inspect.InspectRequest;
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
    public void insertOrder(OrderRequest request) {
        repository.insertOrder(request);
    }
    public List<RegisterModel> getUnordered() {
        return repository.getUnordered();
    }
    public OrderModel getByIdOrder(int foodId) {
        return repository.getByIdOrder(foodId);
    }
    public void updateOrder(OrderRequest request) {
        repository.updateOrder(request);
    }


    /*public List<StockModel> getAllStock() {
        return repository.getAllStock();
    }*/


    public List<InspectModel> getAllInspection() {
        return repository.getAllInspection();
    }
    public void insertInspection(OrderRequest request) {
        repository.insertInspection(request);
    }
    public InspectModel getByIdInspection(int foodId) {
        return repository.getByIdInspection(foodId);
    }
    public void updateInspection(InspectRequest request) {
        repository.updateInspection(request);
    }
    public int getByIdInsNum(int foodId) {
        return repository.getByIdInsNum(foodId);
    }
    public void updateIns(int insNum, int insInsufficient, int foodId) {
        repository.updateIns(insNum, insInsufficient, foodId);
    }
}
