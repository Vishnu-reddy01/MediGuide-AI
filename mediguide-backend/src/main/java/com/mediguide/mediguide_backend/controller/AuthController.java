package com.mediguide.mediguide_backend.controller;

import com.mediguide.mediguide_backend.dto.AuthResponse;
import com.mediguide.mediguide_backend.dto.RegisterRequest;
import com.mediguide.mediguide_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return userService.register(request);
    }

}