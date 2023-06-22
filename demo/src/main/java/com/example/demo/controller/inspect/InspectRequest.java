package com.example.demo.controller.inspect;

import java.time.LocalDate;

public class InspectRequest {
    private final int foodId;
    private final LocalDate day;
    private final int insNum;
    private final int insInsufficient;

    public int getFoodId() {
        return foodId;
    }

    public LocalDate getDay() {
        return day;
    }

    public int getInsNum() {
        return insNum;
    }

    public int getInsInsufficient() {
        return insInsufficient;
    }

    public InspectRequest(int foodId, LocalDate day, int insNum, int insInsufficient) {
        this.foodId = foodId;
        this.day = day;
        this.insNum = insNum;
        this.insInsufficient = insInsufficient;
    }
}
