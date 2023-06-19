package com.example.demo.controller.inspect;

import com.example.demo.model.InspectModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/inspect")
public class InspectController {
    private final MainService service;

    /*@GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InspectModel> get() {
        return service.getAllInspect();
    }*/

    public InspectController(MainService service) {
        this.service = service;
    }
}
