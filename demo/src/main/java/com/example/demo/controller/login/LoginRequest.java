package com.example.demo.controller.login;

public class LoginRequest {
    private final String userId;
    private final String password;

    public String getUserId() {
        return userId;
    }

    public String getPassword() {
        return password;
    }

    public LoginRequest(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }
}
