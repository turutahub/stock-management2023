package com.example.demo.service;

import com.example.demo.controller.inspect.InspectRequest;
import com.example.demo.controller.inventory.InventoryRequest;
import com.example.demo.controller.order.OrderRequest;
import com.example.demo.controller.stock.StockRequest;
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



    /* 食材登録機能 */
    public List<RegisterModel> getAllFood() {//food_mstの取得
        return repository.getAllFood();
    }
    public void registerFood(RegisterModel model) {//レコードの追加
        repository.registerFood(model);
    }
    public RegisterModel getById(int foodId) {//food_idごとに取得
        return repository.getById(foodId);
    }
    public void updateFood(RegisterModel model) {//レコードの更新
        repository.updateFood(model);
    }
    public void deleteFood(int foodId) {//レコードの削除
        repository.deleteFood(foodId);
    }


    /* 発注機能 */
    public List<OrderModel> getAllOrder() {//impire_historyの取得
        return repository.getAllOrder();
    }
    public void insertOrder(OrderRequest request) {//レコードの追加
        repository.insertOrder(request);
    }
    public List<RegisterModel> getUnordered() {//未発注の食材のレコード取得
        return repository.getUnordered();
    }
    public OrderModel getCheckedOrder(int foodId, LocalDate day) {//指定したfood_idと日付を持つレコード取得
        return repository.getCheckedOrder(foodId, day);
    }
    public void updateOrder(OrderRequest request) {//レコードの更新
        repository.updateOrder(request);
    }


    /* 検品機能 */
    public List<InspectModel> getAllInspection() {//inspection_historyの取得
        return repository.getAllInspection();
    }
    public List<OrderModel> getUnInspected() {//未検品の発注のレコード取得
        return repository.getUnInspected();
    }
    public void insertInspection(InspectRequest request) {//レコードの追加
        repository.insertInspection(request);
    }
    public InspectModel getCheckedInspection(int foodId, LocalDate day) {//指定したfood_idと日付を持つレコード取得
        return repository.getCheckedInspection(foodId, day);
    }
    public void updateInspection(InspectRequest request) {//レコードの更新
        repository.updateInspection(request);
    }
    public int getByIdInsNum(int foodId, LocalDate day) {//指定したfood_idと日付を持つレコードの検品数取得
        return repository.getByIdInsNum(foodId, day);
    }
    public void updateIns(int insNum, int insInsufficient, int foodId, LocalDate day) {//発注の更新に伴う検品のレコード更新メソッド
        repository.updateIns(insNum, insInsufficient, foodId, day);
    }
    public LocalDate getByIdDeliveryDay(int foodId, LocalDate day) {
        return repository.getByIdDeliveryDay(foodId, day);
    }


    /* 棚卸機能 */
    public List<InventoryModel> getAllInventory(LocalDate day) {//指定した日付のレコード表示
        return repository.getAllInventory(day);
    }
    public List<InventoryModel> getDoneInventory() {
        return repository.getDoneInventory();
    }
    public List<RegisterModel> getUnInventoried() {//棚卸情報未登録のレコード表示
        return repository.getUnInventoried();
    }
    public int getTodayInsNum(int foodId) {//当日の検品数取得
        return repository.getTodayInsNum(foodId);
    }
    public void insertInventory(InventoryRequest request) {//inventory_historyへのデータの追加
        repository.insertInventory(request);
    }
    public void updateInventory(InventoryRequest request) {
        repository.updateInventory(request);
    }
    public List<InformationModel> getInfo(LocalDate day) {//指定した日付の経営情報取得
        return repository.getInfo(day);
    }
    public void insertInfo(InformationModel model) {//informations_historyへのデータの追加
        repository.insertInfo(model);
    }
    public void updateInfo(InformationModel model) {
        repository.updateInfo(model);
    }


    /* 在庫一覧 */
    public List<StockModel> getAllStock() {
        return repository.getAllStock();
    }

    public int getPastConsumedNum(int foodId, LocalDate day) {
        return repository.getPastConsumedNum(foodId, day);
    }

    public void insertStock(StockRequest request) {
        repository.insertStock(request);
    }

    public void updateStock(StockRequest request) {
        repository.updateStock(request);
    }


    /* 検索機能 */
    public List<InformationModel> searchInformation(LocalDate startDate, LocalDate endDate) {
        return repository.searchInformation(startDate, endDate);
    }

    public List<SearchStockModel> searchStock(LocalDate startDate, LocalDate endDate) {
        return repository.searchStock(startDate, endDate);
    }

    public List<OrderModel> searchOrder(LocalDate startDate, LocalDate endDate) {
        return repository.searchOrder(startDate, endDate);
    }

    public List<SearchInventoryModel> searchInventory(LocalDate startDate, LocalDate endDate) {
        return repository.searchInventory(startDate, endDate);
    }

    public List<RegisterModel> searchFood(String keyword) {
        return repository.searchFood(keyword);
    }

    public List<RegisterModel> searchFoodByPartialMatch(String keyword) {
        return repository.searchFoodByPartialMatch(keyword);
    }
}
