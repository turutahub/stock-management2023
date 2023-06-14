package com.example.demo.model;

import java.time.LocalDate;

public class OrderModel {
    private final int foodId;
    private final LocalDate day;
    private final int impNum;
    private final LocalDate deliveryDay;

    public int getFoodId() {
        return foodId;
    }
    public LocalDate getDay() {
        return day;
    }
    public int getImpNum() {
        return impNum;
    }
    public LocalDate getDeliveryDay() {
        return deliveryDay;
    }
    public OrderModel(int foodId, LocalDate day, int impNum, LocalDate deliveryDay) {
        this.foodId = foodId;
        this.day = day;
        this.impNum = impNum;
        this.deliveryDay = deliveryDay;
    }
}
