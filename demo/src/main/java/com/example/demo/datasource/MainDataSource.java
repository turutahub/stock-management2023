package com.example.demo.datasource;

import com.example.demo.controller.inspect.InspectRequest;
import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.*;
import com.example.demo.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.websocket.OnError;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class MainDataSource implements MainRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    //食材登録
    @Override
    public List<RegisterModel> getAllFood() {
        String sql = "SELECT * FROM food_mst";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toRegisterModel).collect(Collectors.toList());
    }
    private RegisterModel toRegisterModel(Map<String, Object> record) {
        return new RegisterModel(
                (int) record.get("food_id"),
                (String) record.get("food_name"),
                (String) record.get("unit"),
                (int) record.get("cost"),
                (int) record.get("expdays"),
                (String) record.get("supplier"),
                (String) record.get("note")
        );
    }
    @Override
    public void registerFood(RegisterModel model) {
        String sql = "INSERT INTO food_mst(food_name, unit, cost, expdays, supplier, note) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                model.getFoodName(),
                model.getUnit(),
                model.getCost(),
                model.getExpDays(),
                model.getSupplier(),
                model.getNote()
        );
    }
    @Override
    public RegisterModel getById(int foodId) {
        String sql = "SELECT * FROM food_mst WHERE food_id = ?";
        List<Map<String, Object>> record = jdbcTemplate.queryForList(sql, foodId);
        return toRegisterModel(record.get(0));
    }
    @Override
    public void updateFood(RegisterModel model) {
        String sql = "UPDATE food_mst SET food_name = ?, unit = ?, cost = ?, expdays = ?, supplier = ?, note= ? WHERE food_id = ?";
        jdbcTemplate.update(
                sql,
                model.getFoodName(),
                model.getUnit(),
                model.getCost(),
                model.getExpDays(),
                model.getSupplier(),
                model.getNote(),
                model.getFoodId()
        );
    }
    @Override
    public void deleteFood(int foodId) {
        String sql = "DELETE FROM food_mst WHERE food_id = ?";
        jdbcTemplate.update(sql, foodId);
    }


    //発注
    @Override
    public List<OrderModel> getAllOrder() {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "LEFT JOIN impire_history ON food_mst.food_id = impire_history.food_id\n" +
                "WHERE impire_history.food_id IS NOT NULL";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toOrderModel).collect(Collectors.toList());
    }
    @Override
    public List<RegisterModel> getUnordered() {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "WHERE food_id NOT IN (SELECT food_id FROM impire_history WHERE day = CURRENT_DATE)";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toRegisterModel).collect(Collectors.toList());
    }
    @Override
    public void insertOrder(OrderRequest request) {
        String sql = "INSERT INTO impire_history (food_id, day, imp_num, delivery_day)\n" +
                "VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                request.getFoodId(),
                request.getDay(),
                request.getImpNum(),
                request.getDeliveryDay()
        );
    }
    private OrderModel toOrderModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        Date deliveryDay = (Date) record.get("delivery_day");
        return new OrderModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (String) record.get("food_name"),
                (String) record.get("unit"),
                (int) record.get("cost"),
                (int) record.get("expdays"),
                (String) record.get("supplier"),
                (String) record.get("note"),
                (int) record.get("imp_num"),
                deliveryDay.toLocalDate()
        );
    }
    @Override
    public OrderModel getCheckedOrder(int foodId, LocalDate day) {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "INNER JOIN impire_history ON food_mst.food_id = impire_history.food_id\n" +
                "WHERE food_mst.food_id = ? AND impire_history.day = ?";
        List<Map<String, Object>> record = jdbcTemplate.queryForList(sql, foodId, day);
        return toOrderModel(record.get(0));
    }
    @Override
    public void updateOrder(OrderRequest request) {
        String sql = "UPDATE impire_history SET imp_num = ?, delivery_day = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                request.getImpNum(),
                request.getDeliveryDay(),
                request.getFoodId(),
                request.getDay()
        );
    }







    //検品
    @Override
    public List<InspectModel> getAllInspection() {
        String sql = "SELECT *\n" +
                "FROM inspection_history\n" +
                "LEFT JOIN food_mst ON inspection_history.food_id = food_mst.food_id\n" +
                "LEFT JOIN impire_history ON inspection_history.food_id = impire_history.food_id AND inspection_history.day = impire_history.day;\n";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toInspectModel).collect(Collectors.toList());
    }
    private InspectModel toInspectModel(Map<String, Object> record) {
        Date impDay = (Date) record.get("day");
        Date insDay = (Date) record.get("delivery_day");
        return new InspectModel(
                (int) record.get("food_id"),
                (String) record.get("food_name"),
                (String) record.get("unit"),
                (int) record.get("cost"),
                (int) record.get("expdays"),
                (String) record.get("supplier"),
                (String) record.get("note"),
                (int) record.get("imp_num"),
                impDay.toLocalDate(),
                (int) record.get("ins_num"),
                (int) record.get("ins_insufficient"),
                insDay.toLocalDate()
        );
    }
    @Override
    public List<OrderModel> getUnInspected() {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "LEFT JOIN impire_history ON food_mst.food_id = impire_history.food_id\n" +
                "WHERE (impire_history.food_id, impire_history.day) NOT IN (SELECT food_id, day FROM inspection_history)";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toOrderModel).collect(Collectors.toList());

    }

    @Override
    public void insertInspection(InspectRequest request) {
        String sql = "INSERT INTO inspection_history (food_id, day, ins_num, ins_insufficient) VALUES(?, ?, ?, ?);";
        jdbcTemplate.update(
                sql,
                request.getFoodId(),
                request.getDay(),
                request.getInsNum(),
                request.getInsInsufficient()
        );
    }
    /*
    @Override
    public void insertInspection(OrderRequest request) {
        String sql = "INSERT INTO inspection_history (food_id, day, ins_num, ins_insufficient) VALUES(?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                request.getFoodId(),
                request.getDay(),
                0,
                request.getImpNum() - 0
        );
    }*/
    @Override
    public InspectModel getCheckedInspection(int foodId, LocalDate day) {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "INNER JOIN impire_history ON food_mst.food_id = impire_history.food_id\n" +
                "INNER JOIN inspection_history ON food_mst.food_id = inspection_history.food_id\n" +
                "WHERE food_mst.food_id = ? AND impire_history.day = ?";
        List<Map<String, Object>> record = jdbcTemplate.queryForList(sql, foodId, day);
        return toInspectModel(record.get(0));
    }

    @Override
    public void updateInspection(InspectRequest request) {
        String sql = "UPDATE inspection_history SET ins_num = ?, ins_insufficient = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                request.getInsNum(),
                request.getInsInsufficient(),
                request.getFoodId(),
                request.getDay()
        );
    }

    @Override
    public int getByIdInsNum(int foodId, LocalDate day) {
        String sql = "SELECT ins_num FROM inspection_history WHERE food_id = ? AND day = ?";
        return jdbcTemplate.queryForObject(sql, int.class, foodId);
    }
    @Override
    public void updateIns(int insNum, int insInsufficient, int foodId, LocalDate day) {
        String sql = "UPDATE inspection_history SET ins_num = ?, ins_insufficient = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                insNum,
                insInsufficient,
                foodId,
                day
        );
    }


    //棚卸し
    public List<InventoryModel> getAllInventory() {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "INNER JOIN inventory_history ON food_mst.food_id = inventory_history.food_id\n" +
                "INNER JOIN impire_history ON inventory_history.food_id = impire_history.food_id AND inventory_history.day = impire_history.day;\n";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toInventoryModel).collect(Collectors.toList());
    }

    private InventoryModel toInventoryModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new InventoryModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (String) record.get("food_name"),
                (int) record.get("expdays"),
                (int) record.get("stock"),
                (int) record.get("spplm_num"),
                (int) record.get("spplm_amt"),
                (int) record.get("waste_num"),
                (int) record.get("consumed_num"),
                (int) record.get("waste_amt"),
                (BigDecimal) record.get("loss_rate"),
                (int) record.get("cost"),
                (int) record.get("required_num"),
                (int) record.get("insufficient_num")
        );
    }

    @Override
    public List<RegisterModel> getUnInventoried() {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "LEFT JOIN stock_history ON food_mst.food_id = stock_history.food_id\n" +
                "LEFT JOIN inventory_history ON food_mst.food_id = inventory_history.food_id\n" +
                "WHERE stock_history.food_id IS NULL AND inventory_history.food_id IS NULL";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toRegisterModel).collect(Collectors.toList());
    }

    @Override
    public int getTodayInsNum(int foodId) {
        String sql = "SELECT SUM(inspection_history.ins_num) AS total_ins_num\n" +
                "FROM impire_history\n" +
                "INNER JOIN inspection_history ON impire_history.food_id = inspection_history.food_id AND impire_history.day = inspection_history.day\n" +
                "WHERE impire_history.delivery_day = CURRENT_DATE AND impire_history.food_id = ?;\n";
        return jdbcTemplate.queryForObject(sql, int.class, foodId);
    }

    @Override
    public List<InformationModel> getInfo(LocalDate day) {
        String sql = "SELECT * FROM informations_history WHERE day = ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, day);
        return records.stream().map(this::toInformationModel).collect(Collectors.toList());
    }

    private InformationModel toInformationModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new InformationModel(
                day.toLocalDate(),
                (int) record.get("cost"),
                (BigDecimal) record.get("cost_rate"),
                (int) record.get("waste_amt"),
                (BigDecimal) record.get("loss_rate"),
                (int) record.get("sales"),
                (int) record.get("balance")
        );
    }


    //在庫一覧
    /*@Override
    public List<StockModel> getAllStock() {
        String sql = "SELECT * FROM stock_history";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toStockModel).collect(Collectors.toList());
    }
    @Override
    public void deleteStock(int foodId) {
        // 在庫を削除する処理を実装する
        // foodIdを使用してデータベースから在庫を削除するなどの処理を追加
    }*/
    private StockModel toStockModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new StockModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (int) record.get("stock"),
                (int) record.get("consumed_num"),
                (int) record.get("insufficient_num"),
                (int) record.get("required_num"),
                (int) record.get("cost"),
                (int) record.get("waste_amt"),
                (BigDecimal) record.get("loss_rate")
        );
    }
    public int getPastConsumedNum(int foodId, LocalDate day) {
        String sql = "SELECT consumed_num FROM stock_history WHERE food_id = ? AND day = ?";
        return jdbcTemplate.queryForObject(sql, int.class, foodId, day);
    }



}
