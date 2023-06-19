package com.example.demo.datasource;

import com.example.demo.controller.order.OrderRequest;
import com.example.demo.model.InspectModel;
import com.example.demo.model.OrderModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.model.StockModel;
import com.example.demo.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class MainDataSource implements MainRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

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


    @Override
    public List<OrderModel> getAllOrder() {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "FULL OUTER JOIN impire_history ON food_mst.food_id = impire_history.food_id;\n";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toOrderModel).collect(Collectors.toList());
    }

    @Override
    public void insertOrder(int foodId, OrderRequest request) {
        String sql = "INSERT INTO impire_history (food_id, day, imp_num, delivery_day)\n" +
                "VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                foodId,
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
    }

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

    /*@Override
    public List<InspectModel> getAllInspect() {
        String sql = "SELECT * FROM inspection_history";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toInspectModel).collect(Collectors.toList());
    }

    private InspectModel toInspectModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new InspectModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (int) record.get("ins_num"),
                (int) record.get("ins_insufficient")
        );
    }*/
}
