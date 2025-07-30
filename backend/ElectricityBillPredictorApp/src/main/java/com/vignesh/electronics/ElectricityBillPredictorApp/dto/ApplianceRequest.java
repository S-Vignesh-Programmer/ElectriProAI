package com.vignesh.electronics.ElectricityBillPredictorApp.dto;

import lombok.Data;

@Data
public class ApplianceRequest {
    private int hoursPerDay;
    private int daysPerMonth;
    private double wattage;
}
