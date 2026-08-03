package com.mediguide.mediguide_backend.service;

import com.mediguide.mediguide_backend.dto.AuthResponse;
import com.mediguide.mediguide_backend.dto.LoginRequest;
import com.mediguide.mediguide_backend.dto.RegisterRequest;
import com.mediguide.mediguide_backend.entity.User;
import com.mediguide.mediguide_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public UserService(UserRepository userRepository,
                   PasswordEncoder passwordEncoder,
                   JwtService jwtService) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
}
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return new AuthResponse(true, "Registration Successful");
    }
    public AuthResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return new AuthResponse(false, "User not found");
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        return new AuthResponse(false, "Invalid password");
    }

    String token = jwtService.generateToken(user.getEmail());

return new AuthResponse(
        true,
        "Login Successful",
        token
);
}
}