package com.vignesh.electronics.ElectricityBillPredictorApp.controller;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.SolarRequest;
import com.vignesh.electronics.ElectricityBillPredictorApp.service.SolarComparisonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predict/solar")
@RequiredArgsConstructor
public class SolarComparisonController {

    private final SolarComparisonService service;

    @PostMapping
    public ResponseEntity<String> compare(@RequestBody SolarRequest request) {
        return ResponseEntity.ok(service.compareCost(request));
    }
}

