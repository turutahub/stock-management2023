package com.example.demo.controller.home;

import com.example.demo.model.OrderModel;
import com.example.demo.model.StockModel;
import com.example.demo.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

public class HomeController {
    @RestController
    @RequestMapping("/stock")
    public class StockController {

        @Autowired
        private MainService mainService;

        @GetMapping
        public List<StockModel> getStockList() {
            return mainService.getAllStock();
        }
    }


    @RestController
    @RequestMapping("/order")
    public class OrderController {

        @Autowired
        private MainService mainService;

        @GetMapping("/latest-shipments")
        public List<OrderModel> getLatestShipments() {
            return mainService.getAllOrder();
        }
    }
}