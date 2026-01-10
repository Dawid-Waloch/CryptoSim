package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import java.math.BigDecimal;

public record BuySellRequestDTO(Long userId, Long assetId, BigDecimal quantity) {
}
