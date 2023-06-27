package com.example.demo.controller.inventory;

import com.example.demo.model.InformationModel;
import com.example.demo.model.InventoryModel;
import com.example.demo.model.RegisterModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    private final MainService service;

    @GetMapping(value = "/get/{day}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryModel> getAll(@PathVariable String day) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(day, formatter);
        return service.getAllInventory(date);
    }
    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryModel> getDone() {
        return service.getDoneInventory();
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
    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void insertInv(@RequestBody InventoryRequest request) {
        service.insertInventory(request);
    }
    @PutMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void updateInv(@RequestBody InventoryRequest request) {
        service.updateInventory(request);
    }

    @PostMapping(value = "info", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void insertInfo(@RequestBody InformationModel model) {
        service.insertInfo(model);
    }

    @PutMapping(value = "/info", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void updateInfo(@RequestBody InformationModel model) {
        service.updateInfo(model);
    }

    public InventoryController(MainService service) {
        this.service = service;
    }
}
