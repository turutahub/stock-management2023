package com.example.demo.datasource;

import com.example.demo.model.InspectModel;
import com.example.demo.repository.InspectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class InspectDataSource implements InspectRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<InspectModel> getAll() {
        String sql = "SELECT * FROM inspection_history";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toModel).collect(Collectors.toList());
    }

    private InspectModel toModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new InspectModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (int) record.get("ins_num"),
                (int) record.get("ins_insufficient")
        );
    }
}
