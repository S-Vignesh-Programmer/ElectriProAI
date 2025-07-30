package com.vignesh.electronics.ElectricityBillPredictorApp.service;

import com.google.gson.*;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class GeminiAIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    private final OkHttpClient client = new OkHttpClient.Builder()
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build();

    public String askGemini(String userMessage) {
        JsonObject requestJson = new JsonObject();
        JsonArray contents = new JsonArray();
        JsonObject contentItem = new JsonObject();
        JsonArray parts = new JsonArray();
        JsonObject part = new JsonObject();

        part.addProperty("text", userMessage);
        parts.add(part);
        contentItem.add("parts", parts);
        contents.add(contentItem);
        requestJson.add("contents", contents);

        RequestBody requestBody = RequestBody.create(
                requestJson.toString(),
                MediaType.parse("application/json")
        );

        HttpUrl url = HttpUrl.parse(GEMINI_URL).newBuilder()
                .addQueryParameter("key", apiKey)
                .build();

        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();

        // Retry logic
        for (int attempt = 1; attempt <= 2; attempt++) {
            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful() && response.body() != null) {
                    JsonObject jsonResponse = JsonParser.parseString(response.body().string()).getAsJsonObject();
                    JsonArray candidates = jsonResponse.getAsJsonArray("candidates");
                    if (candidates != null && candidates.size() > 0) {
                        return candidates.get(0)
                                .getAsJsonObject()
                                .getAsJsonObject("content")
                                .getAsJsonArray("parts")
                                .get(0)
                                .getAsJsonObject()
                                .get("text").getAsString();
                    } else {
                        return "Gemini returned no response.";
                    }
                } else {
                    String errorBody = response.body() != null ? response.body().string() : "null";
                    log.error("Gemini API Error: code={}, body={}", response.code(), errorBody);
                    return "Gemini API error (code " + response.code() + ").";
                }
            } catch (IOException e) {
                log.warn("Gemini attempt {} failed: {}", attempt, e.getMessage());
                if (attempt == 2) {
                    return "Gemini service is currently unreachable. Please try again later.";
                }
                try {
                    Thread.sleep(2000); // wait before retrying
                } catch (InterruptedException ignored) {}
            }
        }

        return "nexpected error occurred.";
    }
}
