package com.example.demo.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class StockModel {
    private final int foodId;
    private final LocalDate day;
    private final int stock;
    private final int consumedNum;
    private final int insufficientNum;
    private final int requiredNum;
    private final int cost;
    private final int wasteAmt;
    private final BigDecimal lossRate;

    public int getFoodId() {
        return foodId;
    }

    public LocalDate getDay() {
        return day;
    }

    public int getStock() {
        return stock;
    }

    public int getConsumedNum() {
        return consumedNum;
    }

    public int getInsufficientNum() {
        return insufficientNum;
    }

    public int getRequiredNum() {
        return requiredNum;
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

    public StockModel(int foodId, LocalDate day, int stock, int consumedNum, int insufficientNum, int requiredNum, int cost, int wasteAmt, BigDecimal lossRate) {
        this.foodId = foodId;
        this.day = day;
        this.stock = stock;
        this.consumedNum = consumedNum;
        this.insufficientNum = insufficientNum;
        this.requiredNum = requiredNum;
        this.cost = cost;
        this.wasteAmt = wasteAmt;
        this.lossRate = lossRate;
    }
}
