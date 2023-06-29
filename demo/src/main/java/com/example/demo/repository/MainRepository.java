package com.example.demo.repository;

import com.example.demo.controller.inspect.InspectRequest;
import com.example.demo.controller.inventory.InventoryRequest;
import com.example.demo.controller.order.OrderRequest;
import com.example.demo.controller.stock.StockRequest;
import com.example.demo.model.*;
import org.springframework.core.annotation.Order;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface MainRepository {
    /* 食材登録機能 */
    List<RegisterModel> getAllFood();
    void registerFood(RegisterModel model);
    RegisterModel getById(int foodId);
    void updateFood(RegisterModel model);
    void deleteFood(int foodId);

    /* 発注機能 */
    List<OrderModel> getAllOrder();
    void insertOrder(OrderRequest request);
    List<RegisterModel> getUnordered();
    OrderModel getCheckedOrder(int foodId, LocalDate day);
    void updateOrder(OrderRequest request);

    /* 検品機能 */
    List<InspectModel> getAllInspection();
    List<OrderModel> getUnInspected();
    void insertInspection(InspectRequest request);
    InspectModel getCheckedInspection(int foodId, LocalDate day);
    void updateInspection(InspectRequest request);
    int getByIdInsNum(int foodId, LocalDate day);
    LocalDate getByIdDeliveryDay(int foodId, LocalDate day);
    void updateIns(int insNum, int insInsufficient, int foodId, LocalDate day);


    /* 棚卸し機能 */
    List<InventoryModel> getAllInventory(LocalDate day);
    List<InventoryModel> getDoneInventory();
    List<RegisterModel> getUnInventoried();
    int getTodayInsNum(int foodId);
    List<InformationModel> getInfo(LocalDate day);
    void insertInventory(InventoryRequest request);
    void updateInventory(InventoryRequest request);
    void insertInfo(InformationModel model);
    void updateInfo(InformationModel model);


    /* 在庫一覧機能 */
    List<StockModel> getAllStock();
    int getPastConsumedNum(int foodId, LocalDate day);
    void insertStock(StockRequest request);
    void updateStock(StockRequest request);


    /* 検索機能 */
    List<InformationModel> searchInformation(LocalDate startDate, LocalDate endDate);
    List<SearchStockModel> searchStock(LocalDate startDate, LocalDate endDate);
    List<OrderModel> searchOrder(LocalDate startDate, LocalDate endDate);
    List<SearchInventoryModel> searchInventory(LocalDate startDate, LocalDate endDate);
}
