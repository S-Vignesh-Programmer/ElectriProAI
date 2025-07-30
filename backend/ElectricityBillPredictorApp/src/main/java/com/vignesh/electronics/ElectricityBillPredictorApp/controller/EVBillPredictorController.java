package com.vignesh.electronics.ElectricityBillPredictorApp.controller;

import com.vignesh.electronics.ElectricityBillPredictorApp.dto.EVRequest;
import com.vignesh.electronics.ElectricityBillPredictorApp.service.EVBillPredictorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predict/ev")
@RequiredArgsConstructor
public class EVBillPredictorController {

    private final EVBillPredictorService service;

    @PostMapping
    public ResponseEntity<Double> predictEV(@RequestBody EVRequest request) {
        return ResponseEntity.ok(service.calculateEVBill(request));
    }
}

