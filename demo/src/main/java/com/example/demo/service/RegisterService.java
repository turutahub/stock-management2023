package com.example.demo.service;

import com.example.demo.model.RegisterModel;
import com.example.demo.repository.RegisterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterService {
    private final RegisterRepository repository;

    public List<RegisterModel> getAll() {
        return repository.getAll();
    }

    public void registerFood(RegisterModel model) {
        repository.registerFood(model);
    }

    public RegisterModel getById(int foodId) {
        return repository.getById(foodId);
    }

    public void updateFood(RegisterModel model) {
        repository.updateFood(model);
    }
    public void deleteFood(int foodId) {
        repository.deleteFood(foodId);
    }

    public RegisterService(RegisterRepository repository) {
        this.repository = repository;
    }
}
