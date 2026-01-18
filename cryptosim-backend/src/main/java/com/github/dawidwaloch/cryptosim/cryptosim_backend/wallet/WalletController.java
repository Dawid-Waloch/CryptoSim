package com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@Tag(name = "Wallet")
@RestController
@RequestMapping("/wallets")
@RequiredArgsConstructor
public class WalletController {
    private final WalletService walletService;

    @Operation(summary = "Get user wallets")
    @PostMapping("/{userId}")
    public UserWalletsResponseDTO getWalletByUserId(@PathVariable Long userId) {
        return walletService.getWalletsByUserId(userId);
    }

}
