package com.vignesh.electronics.ElectricityBillPredictorApp.service;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.EVRequest;
import org.springframework.stereotype.Service;

@Service
public class EVBillPredictorService {
    public double calculateEVBill(EVRequest request) {
        double costPerUnit = 6.0;
        return request.getBatteryKWh() * request.getChargesPerMonth() * costPerUnit;
    }
}

