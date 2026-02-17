package com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet;

import java.math.BigDecimal;
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

    public void withdraw(Long userId, BigDecimal amount){
        if (amount.compareTo(BigDecimal.ZERO) <= 0) throw new IllegalArgumentException("Cost must be positive");

        Wallet wallet = walletRepository.findByUserIdAndCurrency(userId, "USD").orElseThrow(() -> new IllegalStateException("Currency doesn't exists"));

        if (wallet.getBalance().compareTo(amount) < 0) throw new IllegalStateException("Insufficient balance");

        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);
    }

    public void deposit(Long userId, BigDecimal amount){
        if (amount.compareTo(BigDecimal.ZERO) <= 0) throw new IllegalArgumentException("Cost must be positive");

        Wallet wallet = walletRepository.findByUserIdAndCurrency(userId, "USD").orElseGet(() -> {
            Wallet w = new Wallet();
            w.setUserId(userId);
            return w;
        });

        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);
    }
}
