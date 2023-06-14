package com.example.demo.datasource;

import com.example.demo.model.UserModel;
import com.example.demo.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;

@Repository
public class LoginDataSource implements LoginRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Override
    public void updateSessionId(UserModel user) {
        String sql = "UPDATE users SET session_id = ? WHERE user_id = ? AND password = ?";
        jdbcTemplate.update(
                sql,
                user.getSessionId(),
                user.getUserId(),
                user.getPassword()
                );
    }
    @Override
    public UserModel checkId(String userId, String sessionId) {
        String sql = "SELECT * FROM users WHERE user_id = ? AND session_id = ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, userId, sessionId);
        return toModel(records.get(0));
    }

    private UserModel toModel(Map<String, Object> record) {
        return new UserModel(
                (int) record.get("id"),
                (String) record.get("user_id"),
                (String) record.get("password"),
                (String) record.get("session_id")
        );
    }

}
