package com.vignesh.electronics.ElectricityBillPredictorApp;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ElectricityBillPredictorAppApplication{

	public static void main(String[] args) {
		// Load .env manually from the backend folder
		Dotenv dotenv = Dotenv.configure()
				.directory("backend/ElectricityBillPredictorApp")
				.load();

		System.setProperty("frontend.origin", dotenv.get("FRONTEND_ORIGIN"));
		System.setProperty("gemini.api.key", dotenv.get("GEMINI_API_KEY"));
		System.setProperty("server.port", dotenv.get("PORT"));

		SpringApplication.run(ElectricityBillPredictorAppApplication.class, args);
	}
}
