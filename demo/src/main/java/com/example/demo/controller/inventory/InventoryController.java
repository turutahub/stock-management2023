package com.example.demo.controller.inventory;

import com.example.demo.model.InformationModel;
import com.example.demo.model.InventoryModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    private final MainService service;

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryModel> getAll() {
        return service.getAllInventory();
    }

    @GetMapping(value = "/get", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisterModel> getUnInv() {
        return service.getUnInventoried();
    }

    @GetMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public int getTodayInsNum(@PathVariable int foodId) {
        return service.getTodayInsNum(foodId);
    }


    @GetMapping(value = "/info/{day}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InformationModel> getInfo(@PathVariable String day) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(day, formatter);
        return service.getInfo(date);
    }

    public InventoryController(MainService service) {
        this.service = service;
    }
}
