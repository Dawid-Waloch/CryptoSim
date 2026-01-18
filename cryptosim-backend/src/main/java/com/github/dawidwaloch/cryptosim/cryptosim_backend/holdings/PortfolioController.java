package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Portfolio")
@RestController
@RequiredArgsConstructor
public class PortfolioController {
    private final PortfolioService portfolioService;

    @Operation(summary = "Get all user's holdings")
    @GetMapping("/portfolio")
    public List<PortfolioItemDto> getPortfolio(@Parameter(description = "User ID", example = "1") @RequestParam Long userId){
        return portfolioService.getPortfolioForUser(userId);
    }
}
