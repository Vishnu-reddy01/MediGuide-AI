package com.mediguide.mediguide_backend.controller;

import com.mediguide.mediguide_backend.dto.ChatRequest;
import com.mediguide.mediguide_backend.dto.ChatResponse;
import com.mediguide.mediguide_backend.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String reply = chatService.chat(request.getMessage());

        return new ChatResponse(reply);
    }
}