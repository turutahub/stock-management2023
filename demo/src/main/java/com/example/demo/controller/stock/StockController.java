package com.example.demo.controller.stock;

import com.example.demo.model.StockModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/stock")
public class StockController {
    private final MainService service;

    public StockController(MainService service) {
        this.service = service;
    }

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<StockModel> getAllStock() {
        return service.getAllStock();
    }
    @GetMapping(value = "/{foodId}/{day}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public int getPastConsumedNum(@PathVariable int foodId, @PathVariable String day) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(day, formatter);
        return service.getPastConsumedNum(foodId, date);
    }
    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void insert(@RequestBody StockRequest request) {
        service.insertStock(request);
    }

    @PutMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody StockRequest request) {
        service.updateStock(request);
    }
}