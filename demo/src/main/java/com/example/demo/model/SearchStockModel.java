package com.example.demo.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SearchStockModel {
    private final int foodId;
    private final String foodName;
    private final LocalDate day;
    private final int cost;
    private final int wasteAmt;
    private final BigDecimal lossRate;
    private final int consumedNum;

    public int getFoodId() {
        return foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public LocalDate getDay() {
        return day;
    }

    public int getCost() {
        return cost;
    }

    public int getWasteAmt() {
        return wasteAmt;
    }

    public BigDecimal getLossRate() {
        return lossRate;
    }

    public int getConsumedNum() {
        return consumedNum;
    }

    public SearchStockModel(int foodId, String foodName, LocalDate day, int cost, int wasteAmt, BigDecimal lossRate, int consumedNum) {
        this.foodId = foodId;
        this.foodName = foodName;
        this.day = day;
        this.cost = cost;
        this.wasteAmt = wasteAmt;
        this.lossRate = lossRate;
        this.consumedNum = consumedNum;
    }
}
