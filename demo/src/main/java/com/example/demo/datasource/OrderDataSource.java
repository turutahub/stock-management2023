package com.example.demo.datasource;

import com.example.demo.controller.order.OrderRequest;
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
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "FULL OUTER JOIN impire_history ON food_mst.food_id = impire_history.food_id;\n";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toModel).collect(Collectors.toList());
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


    private OrderModel toModel(Map<String, Object> record) {
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


}
