package com.example.demo.repository;

import com.example.demo.controller.inspect.InspectRequest;
import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.InspectModel;
import com.example.demo.model.OrderModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.model.StockModel;
import org.springframework.core.annotation.Order;

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
    void insertOrder(OrderRequest request);
    List<RegisterModel> getUnordered();
    OrderModel getByIdOrder(int foodId);
    void updateOrder(OrderRequest request);


    //在庫一覧機能
    /*List<StockModel> getAllStock();
    void deleteStock(int foodId);*/


    //検品機能
    List<InspectModel> getAllInspection();
    void insertInspection(OrderRequest request);
    InspectModel getByIdInspection(int foodId);
    void updateInspection(InspectRequest request);
    int getByIdInsNum(int foodId);
    void updateIns(int insNum, int insInsufficient, int foodId);
}
