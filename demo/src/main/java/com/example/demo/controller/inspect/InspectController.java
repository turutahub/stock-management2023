package com.example.demo.controller.inspect;

import com.example.demo.model.InspectModel;
import com.example.demo.service.InspectService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/inspect")
public class InspectController {
    private final InspectService service;

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InspectModel> get() {
        return service.getAll();
    }

    public InspectController(InspectService service) {
        this.service = service;
    }
}
