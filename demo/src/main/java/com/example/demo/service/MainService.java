package com.example.demo.service;

import com.example.demo.controller.inspect.InspectRequest;
import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.*;
import com.example.demo.repository.MainRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
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
    public OrderModel getCheckedOrder(int foodId, LocalDate day) {
        return repository.getCheckedOrder(foodId, day);
    }
    public void updateOrder(OrderRequest request) {
        repository.updateOrder(request);
    }


    public List<InspectModel> getAllInspection() {
        return repository.getAllInspection();
    }
    public List<OrderModel> getUnInspected() {
        return repository.getUnInspected();
    }
    public void insertInspection(InspectRequest request) {
        repository.insertInspection(request);
    }
    /*public void insertInspection(OrderRequest request) {
        repository.insertInspection(request);
    }*/

    public InspectModel getCheckedInspection(int foodId, LocalDate day) {
        return repository.getCheckedInspection(foodId, day);
    }

    public void updateInspection(InspectRequest request) {
        repository.updateInspection(request);
    }

    public int getByIdInsNum(int foodId, LocalDate day) {
        return repository.getByIdInsNum(foodId, day);
    }
    public void updateIns(int insNum, int insInsufficient, int foodId, LocalDate day) {
        repository.updateIns(insNum, insInsufficient, foodId, day);
    }

    //棚卸し
    public List<InventoryModel> getAllInventory() {
        return repository.getAllInventory();
    }
    public List<RegisterModel> getUnInventoried() {
        return repository.getUnInventoried();
    }

    public int getTodayInsNum(int foodId) {
        return repository.getTodayInsNum(foodId);
    }

    public List<InformationModel> getInfo(LocalDate day) {
        return repository.getInfo(day);
    }

    /*public List<StockModel> getAllStock() {
        return repository.getAllStock();
    }*/

    public int getPastConsumedNum(int foodId, LocalDate day) {
        return repository.getPastConsumedNum(foodId, day);
    }



}
