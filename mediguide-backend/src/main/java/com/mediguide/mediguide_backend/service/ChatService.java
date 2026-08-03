package com.mediguide.mediguide_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ChatService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String chat(String userMessage) {

        String prompt = """
                You are MediGuide AI.

                Answer ONLY questions related to:
                - Medicines
                - Food
                - Nutrition
                - Basic health

                If the question is unrelated, reply:
                "I can only answer medicine and food related questions."

                Keep your answers short and simple.

                User Question:
                """ + userMessage;

        Map<String, Object> body = Map.of(
                "model", "llama3.2:latest",
                "prompt", prompt,
                "stream", false
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "http://localhost:11434/api/generate",
                request,
                String.class
        );

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode json = mapper.readTree(response.getBody());
            return json.get("response").asText();
        } catch (Exception e) {
            return "Unable to process AI response.";
        }
    }
}