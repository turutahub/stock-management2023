package com.example.demo.repository;

import com.example.demo.model.StockModel;

import java.util.List;

public interface StockRepository {
    List<StockModel> getAll();

    void deleteStock(int foodId);

    // 他のメソッドや機能を追加できます
}
