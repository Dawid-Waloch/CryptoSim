package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Schema(name = "Transaction")
public record TransactionDTO(

        @Schema(description = "Transaction ID", example = "15")
        Long id,

        @Schema(
                description = "Transaction type",
                example = "BUY",
                allowableValues = {"BUY", "SELL"}
        )
        String type,

        @Schema(description = "Asset symbol", example = "BTC")
        String symbol,

        @Schema(description = "Asset full name", example = "Bitcoin")
        String name,

        @Schema(description = "Quantity of the asset traded", example = "0.25")
        BigDecimal quantity,

        @Schema(
                description = "Asset price at the moment of transaction",
                example = "32000.00"
        )
        BigDecimal price,

        @Schema(
                description = "Total transaction value (quantity * price)",
                example = "8000.00"
        )
        BigDecimal value,

        @Schema(
                description = "Date and time when the transaction was created",
                example = "2026-01-12T14:30:00"
        )
        LocalDateTime createdAt
) {}
