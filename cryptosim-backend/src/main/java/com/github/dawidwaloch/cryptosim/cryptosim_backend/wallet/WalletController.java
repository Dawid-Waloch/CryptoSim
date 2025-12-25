package com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/wallets")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService walletService;

    @PostMapping("/{userId}")
    public UserWalletsResponseDTO getWalletByUserId(@PathVariable Long userId) {
        return walletService.getWalletsByUserId(userId);
    }

}
