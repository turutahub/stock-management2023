package com.example.demo.controller.inventory;

import java.time.LocalDate;

public class InventoryRequest {
    private final int foodId;
    private final LocalDate day;
    private final int spplmNum;
    private final int spplmAmt;
    private final int wasteNum;

    public int getFoodId() {
        return foodId;
    }

    public LocalDate getDay() {
        return day;
    }

    public int getSpplmNum() {
        return spplmNum;
    }

    public int getSpplmAmt() {
        return spplmAmt;
    }

    public int getWasteNum() {
        return wasteNum;
    }

    public InventoryRequest(int foodId, LocalDate day, int spplmNum, int spplmAmt, int wasteNum) {
        this.foodId = foodId;
        this.day = day;
        this.spplmNum = spplmNum;
        this.spplmAmt = spplmAmt;
        this.wasteNum = wasteNum;
    }
}
