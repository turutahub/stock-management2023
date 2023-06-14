package com.example.demo.datasource;

import com.example.demo.model.RegisterModel;
import com.example.demo.model.StockModel;
import com.example.demo.repository.RegisterRepository;
import com.example.demo.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class RegisterDataSource implements RegisterRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<RegisterModel> getAll() {
        String sql = "SELECT * FROM food_mst";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toModel).collect(Collectors.toList());
    }
    private RegisterModel toModel(Map<String, Object> record) {
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
        String sql = "INSERT INTO food_mst(food_id, food_name, unit, cost, expdays, supplier, note) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                model.getFoodId(),
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
        return toModel(record.get(0));
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
}
