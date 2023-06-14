package com.example.demo.datasource;

import com.example.demo.model.StockModel;
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
public class StockDataSource implements StockRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<StockModel> getAll() {
        String sql = "SELECT * FROM stock_history";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toModel).collect(Collectors.toList());
    }

    @Override
    public void deleteStock(int foodId) {
        // 在庫を削除する処理を実装する
        // foodIdを使用してデータベースから在庫を削除するなどの処理を追加
    }

    private StockModel toModel(Map<String, Object> record) {
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
}
