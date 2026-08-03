package com.mediguide.mediguide_backend.service;

import com.mediguide.mediguide_backend.dto.AuthResponse;
import com.mediguide.mediguide_backend.dto.RegisterRequest;
import com.mediguide.mediguide_backend.entity.User;
import com.mediguide.mediguide_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Password encryption will be added in the next step
        user.setPassword(request.getPassword());

        userRepository.save(user);

        return new AuthResponse("Registration Successful");
    }
}