package com.example.demo.controller.register;

import com.example.demo.model.RegisterModel;
import com.example.demo.service.MainService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/register")
public class RegisterController {
    private final MainService service;

    public RegisterController(MainService service) {
        this.service = service;
    }

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisterModel> getFood() {
        return service.getAllFood();
    }

    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest request) {
        service.registerFood(request.toRegisterModel());
    }

    @GetMapping(value = "/{foodId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public RegisterModel get(@PathVariable int foodId) {
        return service.getById(foodId);
    }

    @PutMapping(value = "/{foodId}", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable int foodId, @RequestBody RegisterRequest request) {
        service.updateFood(request.toRegisterModel(foodId));
    }

    @DeleteMapping(value = "/{foodId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int foodId) {
        service.deleteFood(foodId);
    }
}
