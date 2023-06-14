package com.example.demo.controller.register;

import com.example.demo.model.RegisterModel;
import com.example.demo.service.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/register")
public class RegisterController {
    private final RegisterService service;

    @GetMapping("application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisterModel> getFood() {
        return service.getAll();
    }

    @PostMapping("application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest request) {
        service.registerFood(request.toResisterModel());
    }

    @GetMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public RegisterModel get(@PathVariable int foodId) {
        return service.getById(foodId);
    }

    @PutMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable int foodId, @RequestBody RegisterRequest request) {
        service.updateFood(request.toResisterModel(foodId));
    }

    @DeleteMapping(value = "/{foodId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int foodId) {
        service.deleteFood(foodId);
    }

    public RegisterController(RegisterService service) {
        this.service = service;
    }
}
