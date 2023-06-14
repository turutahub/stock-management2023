package com.example.demo.controller.stock;

import com.example.demo.model.StockModel;
import com.example.demo.service.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stock")
public class StockController {
    private final StockService service;

    public StockController(StockService service) {
        this.service = service;
    }

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<StockModel> getAllStock() {
        return service.getAllStock();
    }
}