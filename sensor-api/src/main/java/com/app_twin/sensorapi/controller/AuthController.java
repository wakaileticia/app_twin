package com.app_twin.sensorapi.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // permite chamadas do app
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Map<String, Object> response = new HashMap<>();
        if ("canguru.festo".equals(username) && "fiap123".equals(password)) {
            response.put("status", "success");
        } else {
            response.put("status", "fail");
        }
        return response;
    }
}
