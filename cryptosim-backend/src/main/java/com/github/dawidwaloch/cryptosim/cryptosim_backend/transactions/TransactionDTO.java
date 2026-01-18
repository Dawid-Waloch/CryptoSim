package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionDTO(
        Long id,
        String type,
        String symbol,
        String name,
        BigDecimal quantity,
        BigDecimal price,
        BigDecimal value,
        LocalDateTime createdAt
){}
