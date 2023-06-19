package com.example.demo.repository;

import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.InspectModel;
import com.example.demo.model.OrderModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.model.StockModel;

import java.util.List;

public interface MainRepository {
    List<RegisterModel> getAllFood();
    void registerFood(RegisterModel model);
    RegisterModel getById(int foodId);
    void updateFood(RegisterModel model);
    void deleteFood(int foodId);

    List<OrderModel> getAllOrder();
    void insertOrder(int foodId, OrderRequest request);
    //OrderModel getById(int foodId);
    //void updateOrder(OrderModel model);
    /*List<StockModel> getAllStock();

    void deleteStock(int foodId);
    List<InspectModel> getAllInspect();*/

}
