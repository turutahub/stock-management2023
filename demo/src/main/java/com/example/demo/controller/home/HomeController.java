package com.example.demo.controller.home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

public class HomeController {
    @RestController
    @RequestMapping("/stock")
    public class StockController {

        @Autowired
        private StockService stockService;

        @GetMapping
        public List<StockItem> getStockList() {
            return stockService.getStockList();
        }
    }

    @RestController
    @RequestMapping("/order")
    public class OrderController {

        @Autowired
        private OrderService orderService;

        @GetMapping("/latest-shipments")
        public List<Shipment> getLatestShipments() {
            return orderService.getLatestShipments();
        }
    }
}
