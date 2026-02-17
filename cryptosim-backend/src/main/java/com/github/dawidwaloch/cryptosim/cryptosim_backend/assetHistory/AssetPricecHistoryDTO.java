package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AssetPricecHistoryDTO(
        @Schema(description = "Price of the asset", example = "123.45")
        BigDecimal price,

        @Schema(description = "Timestamp when the price was recorded", example = "2026-01-11T08:00:00")
        LocalDateTime recordedAt
) {}
