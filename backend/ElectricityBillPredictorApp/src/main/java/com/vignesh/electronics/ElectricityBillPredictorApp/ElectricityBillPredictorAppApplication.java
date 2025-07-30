package com.vignesh.electronics.ElectricityBillPredictorApp;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ElectricityBillPredictorAppApplication {

	public static void main(String[] args) {
		// Check if we're running in production (Render)
		String environment = System.getenv("ENVIRONMENT");

		if (environment == null || !environment.equalsIgnoreCase("production")) {
			// Load .env file only in development
			try {
				Dotenv dotenv = Dotenv.configure()
						.directory("backend/ElectricityBillPredictorApp")
						.load();

				System.setProperty("frontend.origin", dotenv.get("FRONTEND_ORIGIN"));
				System.setProperty("gemini.api.key", dotenv.get("GEMINI_API_KEY"));
				System.setProperty("server.port", dotenv.get("PORT"));
			} catch (Exception e) {
				System.out.println(".env file not found or failed to load: " + e.getMessage());
			}
		}

		// Spring Boot will still read environment variables injected by Render
		SpringApplication.run(ElectricityBillPredictorAppApplication.class, args);
	}
}
