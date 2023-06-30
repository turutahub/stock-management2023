package com.example.demo.controller.home;

import com.example.demo.model.OrderModel;
import com.example.demo.model.StockModel;
import com.example.demo.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private MainService mainService;
    @GetMapping(value = "/stock/{foodName}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public int getStockByFood(@PathVariable String foodName) {
        return mainService.getStockByFood(foodName);
    }

    @GetMapping("/order/latest-shipments")
    public List<OrderModel> getLatestShipments() {
            return mainService.getAllOrder();
    }
}