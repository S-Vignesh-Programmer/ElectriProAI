package com.vignesh.electronics.ElectricityBillPredictorApp.controller;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.ApplianceRequest;
import com.vignesh.electronics.ElectricityBillPredictorApp.service.AppliancePredictorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predict/appliance")
@RequiredArgsConstructor
public class AppliancePredictorController {

    private final AppliancePredictorService service;

    @PostMapping
    public ResponseEntity<Double> predictUsage(@RequestBody ApplianceRequest request) {
        double totalUnits = service.calculateUsage(request);
        return ResponseEntity.ok(totalUnits);
    }
}

