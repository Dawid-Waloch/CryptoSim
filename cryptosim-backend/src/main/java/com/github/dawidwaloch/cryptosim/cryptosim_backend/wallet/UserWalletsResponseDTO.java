package com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet;

import java.util.List;

public record UserWalletsResponseDTO(Long userId, List<WalletResponseDTO> wallets) {}
