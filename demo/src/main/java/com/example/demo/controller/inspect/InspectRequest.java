package com.example.demo.controller.inspect;

public class InspectRequest {
    private final int foodId;
    private final int insNum;
    private final int insInsufficient;

    public int getFoodId() {
        return foodId;
    }

    public int getInsNum() {
        return insNum;
    }

    public int getInsInsufficient() {
        return insInsufficient;
    }

    public InspectRequest(int foodId, int insNum, int insInsufficient) {
        this.foodId = foodId;
        this.insNum = insNum;
        this.insInsufficient = insInsufficient;
    }
}
