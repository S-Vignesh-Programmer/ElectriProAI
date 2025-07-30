package com.vignesh.electronics.ElectricityBillPredictorApp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@RequiredArgsConstructor
public class CORSConfig implements WebMvcConfigurer {

    @Value("${frontend.origin}")
    private String frontendOrigin;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(frontendOrigin)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true) // Optional: Enable if you're using cookies/session/JWT
                .maxAge(3600); // Optional: Cache CORS for 1 hour
    }
}
