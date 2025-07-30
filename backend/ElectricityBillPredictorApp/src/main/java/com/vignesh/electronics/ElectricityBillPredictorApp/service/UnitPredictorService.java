package com.vignesh.electronics.ElectricityBillPredictorApp.service;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.UnitRequest;
import org.springframework.stereotype.Service;

@Service
public class UnitPredictorService {
    public double calculateBill(UnitRequest request) {
        double rate = switch (request.getState().toLowerCase()) {
            case "tamil nadu" -> 4.0;
            case "delhi" -> 5.0;
            case "maharashtra" -> 6.0;
            default -> 5.5;
        };
        return rate * request.getUnits();
    }
}
