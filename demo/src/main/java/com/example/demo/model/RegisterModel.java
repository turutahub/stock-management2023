package com.example.demo.model;

public class RegisterModel {
    private final int foodId;
    private final String foodName;
    private final String unit;
    private final int cost;
    private final int expDays;
    private final String supplier;
    private final String note;

    public int getFoodId() {
        return foodId;
    }
    public String getFoodName() {
        return foodName;
    }
    public String getUnit() {
        return unit;
    }
    public int getCost() {
        return cost;
    }
    public int getExpDays() {
        return expDays;
    }
    public String getSupplier() {
        return supplier;
    }
    public String getNote() {
        return note;
    }

    public RegisterModel(int foodId, String foodName, String unit, int cost, int expDays, String supplier, String note) {
        this.foodId = foodId;
        this.foodName = foodName;
        this.unit = unit;
        this.cost = cost;
        this.expDays = expDays;
        this.supplier = supplier;
        this.note = note;
    }
}
