package com.vignesh.electronics.ElectricityBillPredictorApp.service;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.ApplianceRequest;
import org.springframework.stereotype.Service;

@Service
public class AppliancePredictorService {
    public double calculateUsage(ApplianceRequest request) {
        double kWh = (request.getWattage() * request.getHoursPerDay() * request.getDaysPerMonth()) / 1000.0;
        return kWh;
    }
}

