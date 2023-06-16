package com.example.demo.controller.order;

import java.time.LocalDate;

public class OrderRequest {
    private final int impNum;
    private final LocalDate deliveryDay;

    /*public OrderModel toOrderModel() {
        return toOrderModel(0);
    }
    public OrderModel toOrderModel(int foodId) {
        return new OrderModel(foodId, LocalDate.now(), impNum, deliveryDay);
    }*/

    public OrderRequest(int impNum, LocalDate deliveryDay) {
        this.impNum = impNum;
        this.deliveryDay = deliveryDay;
    }
}
