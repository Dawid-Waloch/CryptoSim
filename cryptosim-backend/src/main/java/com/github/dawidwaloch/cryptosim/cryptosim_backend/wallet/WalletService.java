package com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;

    public UserWalletsResponseDTO getWalletsByUserId(Long userId) {
        List<Wallet> wallets = walletRepository.findByUserId(userId);

        List<WalletResponseDTO> walletDTOs = wallets.stream()
            .map(w -> new WalletResponseDTO(
                w.getId(),
                w.getBalance(),
                w.getLockedBalance(),
                w.getCurrency(),
                w.isActive()
        ))
        .toList();

        return new UserWalletsResponseDTO(userId, walletDTOs);
    }
}
