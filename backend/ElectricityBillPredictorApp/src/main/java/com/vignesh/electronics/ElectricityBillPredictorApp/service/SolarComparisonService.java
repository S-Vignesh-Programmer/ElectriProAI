package com.vignesh.electronics.ElectricityBillPredictorApp.service;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.SolarRequest;
import org.springframework.stereotype.Service;

@Service
public class SolarComparisonService {
    public String compareCost(SolarRequest request) {
        double normalCost = request.getTotalUnits() * 6.0;
        double solarCost = request.getTotalUnits() * 2.5;
        return "Normal: ₹" + normalCost + " | Solar: ₹" + solarCost;
    }
}
