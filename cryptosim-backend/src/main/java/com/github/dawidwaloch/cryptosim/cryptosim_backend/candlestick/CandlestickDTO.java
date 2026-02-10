package com.github.dawidwaloch.cryptosim.cryptosim_backend.candlestick;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

public record CandlestickDTO(
    @Schema(description = "start_time", example = "12:00")
    LocalDateTime startTime,

    @Schema(description = "low", example = "12.10")
    BigDecimal low,

    @Schema(description = "open", example = "13.00")
    BigDecimal open,

    @Schema(description = "close", example = "13.50")
    BigDecimal close,

    @Schema(description = "high", example = "20.00")
    BigDecimal high
) {}
