package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

public record BuySellRequestDTO(
        @Schema(description = "User ID", example = "1")
        Long userId,

        @Schema(description = "Asset ID", example = "2")
        Long assetId,

        @Schema(description = "Quantity of asset", example = "0.5")
        BigDecimal quantity
) {}
