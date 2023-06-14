package com.example.demo.model;

public class UserModel {
    private int id;
    private String userId;
    private String password;
    private String sessionId;

    public int getId() {
        return id;
    }
    public String getUserId() {
        return userId;
    }
    public String getPassword() {
        return password;
    }
    public String getSessionId() {
        return sessionId;
    }

    public static UserModel empty() {
        return new UserModel(0, "", "",  "");
    }

    public UserModel(int id, String userId, String password, String sessionId) {
        this.id = id;
        this.userId = userId;
        this.password = password;
        this.sessionId = sessionId;
    }
}
