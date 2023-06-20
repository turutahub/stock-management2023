package com.example.demo.controller.inspect;

import com.example.demo.model.InspectModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inspect")
public class InspectController {
    private final MainService service;

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InspectModel> getInspection() {
        return service.getAllInspection();
    }

    @GetMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public InspectModel getById(@PathVariable int foodId) {
        return service.getByIdInspection(foodId);
    }

    @PutMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody InspectRequest request) {
        service.updateInspection(request);
    }

    public InspectController(MainService service) {
        this.service = service;
    }
}
