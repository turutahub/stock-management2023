package com.example.demo.controller.order;

import java.time.LocalDate;

public class OrderRequest {
    private final LocalDate day;
    private final int impNum;
    private final LocalDate deliveryDay;

    /*public OrderModel toOrderModel() {
        return toOrderModel(0);
    }
    public OrderModel toOrderModel(int foodId) {
        return new OrderModel(foodId, LocalDate.now(), impNum, deliveryDay);
    }*/

    public LocalDate getDay() {
        return day;
    }

    public int getImpNum() {
        return impNum;
    }

    public LocalDate getDeliveryDay() {
        return deliveryDay;
    }

    public OrderRequest(LocalDate day, int impNum, LocalDate deliveryDay) {
        this.day = day;
        this.impNum = impNum;
        this.deliveryDay = deliveryDay;
    }
}
