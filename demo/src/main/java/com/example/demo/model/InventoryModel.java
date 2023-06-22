package com.example.demo.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class InventoryModel {
    private final int foodId;
    private final LocalDate day;
    private final String foodName;
    private final int expDays;
    private final int stock;
    private final int spplmNum;
    private final int spplmAmt;
    private final int wasteNum;
    private final int consumedNum;
    private final int wasteAmt;
    private final BigDecimal lossRate;
    private final int cost;
    private final int requiredNum;
    private final int insufficientNum;

    public int getFoodId() {
        return foodId;
    }

    public LocalDate getDay() {
        return day;
    }

    public String getFoodName() {
        return foodName;
    }

    public int getExpDays() {
        return expDays;
    }

    public int getStock() {
        return stock;
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

    public int getConsumedNum() {
        return consumedNum;
    }

    public int getWasteAmt() {
        return wasteAmt;
    }

    public BigDecimal getLossRate() {
        return lossRate;
    }

    public int getCost() {
        return cost;
    }

    public int getRequiredNum() {
        return requiredNum;
    }

    public int getInsufficientNum() {
        return insufficientNum;
    }

    public InventoryModel(int foodId, LocalDate day, String foodName, int expDays, int stock, int spplmNum, int spplmAmt, int wasteNum, int consumedNum, int wasteAmt, BigDecimal lossRate, int cost, int requiredNum, int insufficientNum) {
        this.foodId = foodId;
        this.day = day;
        this.foodName = foodName;
        this.expDays = expDays;
        this.stock = stock;
        this.spplmNum = spplmNum;
        this.spplmAmt = spplmAmt;
        this.wasteNum = wasteNum;
        this.consumedNum = consumedNum;
        this.wasteAmt = wasteAmt;
        this.lossRate = lossRate;
        this.cost = cost;
        this.requiredNum = requiredNum;
        this.insufficientNum = insufficientNum;
    }
}
