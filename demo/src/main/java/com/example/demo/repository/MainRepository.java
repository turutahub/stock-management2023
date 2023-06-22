package com.example.demo.repository;

import com.example.demo.controller.inspect.InspectRequest;
import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.*;
import org.springframework.core.annotation.Order;

import java.time.LocalDate;
import java.util.Date;
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
    OrderModel getCheckedOrder(int foodId, LocalDate day);
    void updateOrder(OrderRequest request);


    //在庫一覧機能
    /*List<StockModel> getAllStock();
    void deleteStock(int foodId);*/


    //検品機能
    List<InspectModel> getAllInspection();
    List<OrderModel> getUnInspected();
    void insertInspection(InspectRequest request);
    //void insertInspection(OrderRequest request);
    InspectModel getCheckedInspection(int foodId, LocalDate day);
    void updateInspection(InspectRequest request);
    int getByIdInsNum(int foodId, LocalDate day);
    void updateIns(int insNum, int insInsufficient, int foodId, LocalDate day);


    //棚卸し機能
    List<InventoryModel> getAllInventory();
    List<RegisterModel> getUnInventoried();
}
