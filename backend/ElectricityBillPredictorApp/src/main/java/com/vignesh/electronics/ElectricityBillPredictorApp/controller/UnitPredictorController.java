package com.vignesh.electronics.ElectricityBillPredictorApp.controller;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.UnitRequest;
import com.vignesh.electronics.ElectricityBillPredictorApp.service.UnitPredictorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predict/unit")
@RequiredArgsConstructor
public class UnitPredictorController {

    private final UnitPredictorService unitService;

    @PostMapping
    public ResponseEntity<Double> predictBill(@RequestBody UnitRequest request) {
        double billAmount = unitService.calculateBill(request);
        return ResponseEntity.ok(billAmount);
    }
}
