package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;

public record PortfolioItemDto(
        Long assetId,
        String symbol,
        String name,
        BigDecimal quantity,
        BigDecimal currentPrice,
        BigDecimal value
){}
