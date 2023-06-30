package com.example.demo.controller.home;

import com.example.demo.model.OrderModel;
import com.example.demo.model.StockModel;
import com.example.demo.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {
    private final MainService mainService;

    @Autowired
    public HomeController(MainService mainService) {
        this.mainService = mainService;
    }

    @GetMapping("/order")
    public List<OrderModel> getOrderList() {
        return mainService.getAllOrders();
    }

    @GetMapping("/stock")
    public List<StockModel> getStockListWithSuper() {
        return mainService.getAllStockWithSuper();
    }
}