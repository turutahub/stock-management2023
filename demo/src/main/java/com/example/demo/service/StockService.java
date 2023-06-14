package com.example.demo.service;

import com.example.demo.model.StockModel;
import com.example.demo.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    private final StockRepository repository;

    public StockService(StockRepository repository) {
        this.repository = repository;
    }

    public List<StockModel> getAllStock() {
        return repository.getAll();
    }
}
