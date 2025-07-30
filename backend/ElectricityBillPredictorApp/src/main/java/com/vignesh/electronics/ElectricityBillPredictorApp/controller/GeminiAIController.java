package com.vignesh.electronics.ElectricityBillPredictorApp.controller;

import com.vignesh.electronics.ElectricityBillPredictorApp.service.GeminiAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class GeminiAIController {

    private final GeminiAIService geminiAIService;

    @PostMapping("/chat")
    public ResponseEntity<?> chatWithGemini(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        String response = geminiAIService.askGemini(message);
        return ResponseEntity.ok(Collections.singletonMap("response", response));
    }

}
