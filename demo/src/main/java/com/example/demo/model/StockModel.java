package com.example.demo.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class StockModel {
    private final int foodId;
    private final LocalDate day;
    private final String foodName;
    private final int insufficientNum;
    private final int impNum;
    private final LocalDate deliveryDay;
    private final int stock;
    private final int requiredNum;
    private final int expdays;

    public int getFoodId() {
        return foodId;
    }

    public LocalDate getDay() {
        return day;
    }

    public String getFoodName() {
        return foodName;
    }

    public int getInsufficientNum() {
        return insufficientNum;
    }

    public int getImpNum() {
        return impNum;
    }

    public LocalDate getDeliveryDay() {
        return deliveryDay;
    }

    public int getStock() {
        return stock;
    }

    public int getRequiredNum() {
        return requiredNum;
    }

    public int getExpdays() {
        return expdays;
    }

    public StockModel(int foodId, LocalDate day, String foodName, int insufficientNum, int impNum, LocalDate deliveryDay, int stock, int requiredNum, int expdays) {
        this.foodId = foodId;
        this.day = day;
        this.foodName = foodName;
        this.insufficientNum = insufficientNum;
        this.impNum = impNum;
        this.deliveryDay = deliveryDay;
        this.stock = stock;
        this.requiredNum = requiredNum;
        this.expdays = expdays;
    }
}
