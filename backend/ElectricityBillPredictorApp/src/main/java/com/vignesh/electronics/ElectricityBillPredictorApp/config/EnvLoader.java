package com.vignesh.electronics.ElectricityBillPredictorApp.config;


import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.stereotype.Component;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.nio.file.Paths;

@Component
public class EnvLoader {

    @PostConstruct
    public void loadEnv() {
        try {
            String envPath = Paths.get(".env").toAbsolutePath().toString();

            Dotenv dotenv = Dotenv.configure()
                    .filename(".env") // looks for .env file
                    .directory(Paths.get("").toAbsolutePath().toString()) // ensures working directory
                    .ignoreIfMissing() // prevents crash if file is missing
                    .load();

            System.setProperty("GEMINI_API_KEY", dotenv.get("GEMINI_API_KEY"));
            System.setProperty("FRONTEND_ORIGIN", dotenv.get("FRONTEND_ORIGIN"));
            System.setProperty("PORT", dotenv.get("PORT"));

            System.out.println("Loaded .env from: " + envPath);
        } catch (Exception e) {
            System.err.println("Failed to load .env: " + e.getMessage());
        }
    }
}