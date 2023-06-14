package com.example.demo.service;

import com.example.demo.model.UserModel;
import com.example.demo.repository.LoginRepository;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    private final LoginRepository repository;

    public UserModel checkId(String userId, String sessionId) {
        return repository.checkId(userId, sessionId);
    }
    public void updateSessionId(UserModel user) {
        repository.updateSessionId(user);
    }

    public LoginService(LoginRepository repository) {
        this.repository = repository;
    }
}
