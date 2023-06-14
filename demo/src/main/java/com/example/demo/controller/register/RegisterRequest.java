package com.example.demo.controller.register;

import com.example.demo.model.RegisterModel;

public class RegisterRequest {
    private final String foodName;
    private final String unit;
    private final int cost;
    private final int expDays;
    private final String supplier;
    private final String note;

    public RegisterModel toResisterModel() {
        return toResisterModel(0);
    }

    public RegisterModel toResisterModel(int foodId) {
        return new RegisterModel(foodId, foodName, unit, cost, expDays, supplier, note);
    }

    public RegisterRequest(String foodName, String unit, int cost, int expDays, String supplier, String note) {
        this.foodName = foodName;
        this.unit = unit;
        this.cost = cost;
        this.expDays = expDays;
        this.supplier = supplier;
        this.note = note;
    }
}
