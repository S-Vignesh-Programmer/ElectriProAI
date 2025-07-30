package com.vignesh.electronics.ElectricityBillPredictorApp.controller;

import com.vignesh.electronics.ElectricityBillPredictorApp.model.ChatRequest;
import com.vignesh.electronics.ElectricityBillPredictorApp.service.GeminiAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin
public class ChatbotController {

    private final GeminiAIService geminiAIService;

    @PostMapping("/gemini-chat")
    public String askQuestion(@RequestBody ChatRequest request) {
        return geminiAIService.askGemini(request.getMessage());
    }
}
