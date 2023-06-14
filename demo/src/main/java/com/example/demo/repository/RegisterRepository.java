package com.example.demo.repository;

import com.example.demo.model.RegisterModel;

import java.util.List;

public interface RegisterRepository {
    List<RegisterModel> getAll();
    void registerFood(RegisterModel model);
    RegisterModel getById(int foodId);
    void updateFood(RegisterModel model);
    void deleteFood(int foodId);
}
