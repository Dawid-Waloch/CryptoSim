package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

public record PortfolioItemDto(
        @Schema(description = "ID of the asset", example = "1")
        Long assetId,

        @Schema(description = "Asset symbol", example = "BTC")
        String symbol,

        @Schema(description = "Full name of the asset", example = "Bitcoin")
        String name,

        @Schema(description = "Quantity of the asset held by the user", example = "0.5")
        BigDecimal quantity,

        @Schema(description = "Current price of the asset", example = "30000.50")
        BigDecimal currentPrice,

        @Schema(description = "Total value of this holding (quantity * current price)", example = "15000.25")
        BigDecimal value
) {}
