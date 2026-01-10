package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PortfolioController {
    private final PortfolioService portfolioService;

    @GetMapping("/portfolio")
    public List<PortfolioItemDto> getPortfolio(@RequestParam Long userId){
        return portfolioService.getPortfolioForUser(userId);
    }
}
