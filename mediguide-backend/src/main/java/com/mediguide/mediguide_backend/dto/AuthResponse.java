package com.mediguide.mediguide_backend.dto;

import lombok.Getter;

@Getter
public class AuthResponse {

    private boolean success;
    private String message;
    private String token;

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AuthResponse(boolean success, String message, String token) {
        this.success = success;
        this.message = message;
        this.token = token;
    }
}