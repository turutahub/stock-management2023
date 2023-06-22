package com.example.demo.model;

import java.time.LocalDate;

public class InspectModel {
    private final int foodId;
    private final String foodName;
    private final String unit;
    private final int cost;
    private final int expDays;
    private final String supplier;
    private final String note;
    private final int impNum;
    private final LocalDate impDay;
    private final int insNum;
    private final int insInsufficient;
    private final LocalDate insDay;

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

    public int getImpNum() {
        return impNum;
    }

    public LocalDate getImpDay() {
        return impDay;
    }

    public int getInsNum() {
        return insNum;
    }

    public int getInsInsufficient() {
        return insInsufficient;
    }

    public LocalDate getInsDay() {
        return insDay;
    }

    public InspectModel(int foodId, String foodName, String unit, int cost, int expDays, String supplier, String note, int impNum, LocalDate impDay, int insNum, int insInsufficient, LocalDate insDay) {
        this.foodId = foodId;
        this.foodName = foodName;
        this.unit = unit;
        this.cost = cost;
        this.expDays = expDays;
        this.supplier = supplier;
        this.note = note;
        this.impNum = impNum;
        this.impDay = impDay;
        this.insNum = insNum;
        this.insInsufficient = insInsufficient;
        this.insDay = insDay;
    }
}
