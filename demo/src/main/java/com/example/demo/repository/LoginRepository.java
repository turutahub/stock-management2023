package com.example.demo.repository;

import com.example.demo.model.UserModel;

public interface LoginRepository {

     public void updateSessionId(UserModel user);
     UserModel checkId(String userId, String sessionId);
}
