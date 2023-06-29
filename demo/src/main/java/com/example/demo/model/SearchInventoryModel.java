package com.example.demo.model;

import java.time.LocalDate;

public class SearchInventoryModel {
    private final int foodId;
    private final String foodName;
    private final LocalDate day;
    private final int wasteNum;
    private final int spplmNum;
    private final int spplmAmt;

    public int getFoodId() {
        return foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public LocalDate getDay() {
        return day;
    }

    public int getWasteNum() {
        return wasteNum;
    }

    public int getSpplmNum() {
        return spplmNum;
    }

    public int getSpplmAmt() {
        return spplmAmt;
    }

    public SearchInventoryModel(int foodId, String foodName, LocalDate day, int wasteNum, int spplmNum, int spplmAmt) {
        this.foodId = foodId;
        this.foodName = foodName;
        this.day = day;
        this.wasteNum = wasteNum;
        this.spplmNum = spplmNum;
        this.spplmAmt = spplmAmt;
    }
}
