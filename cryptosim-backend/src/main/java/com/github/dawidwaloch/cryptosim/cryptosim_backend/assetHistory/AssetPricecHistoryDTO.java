package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AssetPricecHistoryDTO(BigDecimal price, LocalDateTime recordedAt) {
}
