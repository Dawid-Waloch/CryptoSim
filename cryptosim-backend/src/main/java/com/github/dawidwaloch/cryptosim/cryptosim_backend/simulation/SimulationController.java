package com.github.dawidwaloch.cryptosim.cryptosim_backend.simulation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Simulation")
@RestController
@RequiredArgsConstructor
public class SimulationController {
    private final SimulationService simulationService;

    @Operation(summary = "Reset simulation", description = "Reset all obtained things during simulation")
    @GetMapping("/reset")
    public ResponseEntity<String> resetSimulation(@RequestParam Long userId) {
        simulationService.resetUserSimulation(userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Simulation reset successfully");
    }
}
