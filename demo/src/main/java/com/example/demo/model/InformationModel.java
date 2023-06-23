package com.example.demo.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class InformationModel {
    private final LocalDate day;
    private final int cost;
    private final BigDecimal costRate;
    private final int wasteAmt;
    private final BigDecimal lossRate;
    private final int sales;
    private final int balance;

    public LocalDate getDay() {
        return day;
    }

    public int getCost() {
        return cost;
    }

    public BigDecimal getCostRate() {
        return costRate;
    }

    public int getWasteAmt() {
        return wasteAmt;
    }

    public BigDecimal getLossRate() {
        return lossRate;
    }

    public int getSales() {
        return sales;
    }

    public int getBalance() {
        return balance;
    }

    public InformationModel(LocalDate day, int cost, BigDecimal costRate, int wasteAmt, BigDecimal lossRate, int sales, int balance) {
        this.day = day;
        this.cost = cost;
        this.costRate = costRate;
        this.wasteAmt = wasteAmt;
        this.lossRate = lossRate;
        this.sales = sales;
        this.balance = balance;
    }
}
