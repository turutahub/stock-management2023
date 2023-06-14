package com.example.demo.datasource;

import com.example.demo.model.OrderModel;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class OrderDataSource implements OrderRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<OrderModel> getAll() {
        String sql = "SELECT * FROM impire_history";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toModel).collect(Collectors.toList());
    }

    private OrderModel toModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        Date deliveryDay = (Date) record.get("delivery_day");
        return new OrderModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (int) record.get("imp_num"),
                deliveryDay.toLocalDate()
        );
    }

    @Override
    public void insertOrder(OrderModel model) {
        String sql = "INSERT INTO impire_history(food_id, day, imp_num, delivery_day) VALUES(?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                model.getFoodId(),
                model.getDay(),
                model.getImpNum(),
                model.getDeliveryDay()
        );
    }

    @Override
    public OrderModel getById(int foodId) {
        String sql = "SELECT * FROM impire_history WHERE food_id = ?";
        List<Map<String, Object>> record = jdbcTemplate.queryForList(sql, foodId);
        return toModel(record.get(0));
    }

    @Override
    public void updateOrder(OrderModel model) {
        String sql = "UPDATE impire_history SET day = ?, imp_num = ?, delivery_day = ? WHERE food_id = ?";
        jdbcTemplate.update(
                sql,
                model.getDay(),
                model.getImpNum(),
                model.getDeliveryDay(),
                model.getFoodId()
        );
    }

    @Override
    public void deleteOrder(int foodId) {
        String sql = "DELETE FROM impire_history WHERE food_id = ?";
        jdbcTemplate.update(sql, foodId);
    }
}
