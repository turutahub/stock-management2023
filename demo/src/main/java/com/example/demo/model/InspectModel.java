package com.example.demo.model;

import java.time.LocalDate;

public class InspectModel {
    private final int foodId;
    private final LocalDate day;
    private final String foodName;
    private final String unit;
    private final int cost;
    private final int expDays;
    private final String supplier;
    private final String note;
    private final int impNum;
    private final int insNum;
    private final int insInsufficient;

    public int getFoodId() {
        return foodId;
    }

    public LocalDate getDay() {
        return day;
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

    public int getImpNum() {
        return impNum;
    }

    public int getInsNum() {
        return insNum;
    }

    public int getInsInsufficient() {
        return insInsufficient;
    }

    public InspectModel(int foodId, LocalDate day, String foodName, String unit, int cost, int expDays, String supplier, String note, int impNum, int insNum, int insInsufficient) {
        this.foodId = foodId;
        this.day = day;
        this.foodName = foodName;
        this.unit = unit;
        this.cost = cost;
        this.expDays = expDays;
        this.supplier = supplier;
        this.note = note;
        this.impNum = impNum;
        this.insNum = insNum;
        this.insInsufficient = insInsufficient;
    }
}
