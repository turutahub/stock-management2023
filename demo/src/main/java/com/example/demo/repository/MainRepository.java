package com.example.demo.repository;

import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.InspectModel;
import com.example.demo.model.OrderModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.model.StockModel;

import java.util.List;

public interface MainRepository {
    //食材登録機能
    List<RegisterModel> getAllFood();
    void registerFood(RegisterModel model);
    RegisterModel getById(int foodId);
    void updateFood(RegisterModel model);
    void deleteFood(int foodId);

    //発注機能
    List<OrderModel> getAllOrder();
    void insertOrder(int foodId, OrderRequest request);

    List<RegisterModel> getOrder();
    //OrderModel getById(int foodId);
    //void updateOrder(OrderModel model);


    //在庫一覧機能
    /*List<StockModel> getAllStock();
    void deleteStock(int foodId);

    //検品機能
    List<InspectModel> getAllInspect();*/

}
