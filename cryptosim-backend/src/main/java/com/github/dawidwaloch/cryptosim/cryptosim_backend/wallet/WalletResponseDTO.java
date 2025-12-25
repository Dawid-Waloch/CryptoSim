package com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet;

import java.math.BigDecimal;

public record WalletResponseDTO(Long id, BigDecimal balance, BigDecimal lockedBalance, String currency, Boolean isActive) {}
