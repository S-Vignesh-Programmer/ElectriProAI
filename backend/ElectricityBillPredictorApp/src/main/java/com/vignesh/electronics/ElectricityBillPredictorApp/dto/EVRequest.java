package com.vignesh.electronics.ElectricityBillPredictorApp.dto;

import lombok.Data;

@Data
public class EVRequest {
    private double batteryKWh;
    private int chargesPerMonth;
}

