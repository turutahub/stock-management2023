package com.example.demo.controller.order;

import java.time.LocalDate;

public class OrderRequest {
    private final int foodId;
    private final LocalDate day;
    private final int impNum;
    private final LocalDate deliveryDay;

    /*public OrderModel toOrderModel() {
        return toOrderModel(0);
    }
    public OrderModel toOrderModel(int foodId) {
        return new OrderModel(foodId, LocalDate.now(), impNum, deliveryDay);
    }*/

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

    public OrderRequest(int foodId, LocalDate day, int impNum, LocalDate deliveryDay) {
        this.foodId = foodId;
        this.day = day;
        this.impNum = impNum;
        this.deliveryDay = deliveryDay;
    }
}
