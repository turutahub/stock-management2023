package com.example.demo.controller.login;

import com.example.demo.service.GenerateSessionId;
import com.example.demo.model.UserModel;
import com.example.demo.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {
    private final LoginService service;
    private final GenerateSessionId sessionId;

    @PutMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public String update(@RequestBody LoginRequest request) {
        String sessionId = GenerateSessionId.randomString(
                32, GenerateSessionId.NUM + GenerateSessionId.ALPHA_L + GenerateSessionId.ALPHA_U);
        UserModel user = new UserModel(0, request.getUserId(), request.getPassword(), sessionId);
        service.updateSessionId(user);
        return user.getSessionId();
    }

    @GetMapping(value = "/check/{userId}/{sessionId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public UserModel check(@PathVariable String userId, @PathVariable String sessionId) {
        return service.checkId(userId, sessionId);
    }

    public LoginController(LoginService service, GenerateSessionId sessionId) {
        this.service = service;
        this.sessionId = sessionId;
    }
}
