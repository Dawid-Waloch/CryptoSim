package com.github.dawidwaloch.cryptosim.cryptosim_backend.simulation;

import org.springframework.stereotype.Service;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings.HoldingRepository;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions.TransactionRepository;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet.WalletRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SimulationService {
    private final TransactionRepository transactionRepository;
    private final HoldingRepository holdingRepository;
    private final WalletRepository walletRepository;

    public void resetUserSimulation(Long userId) {
        holdingRepository.deleteByUserId(userId);
        walletRepository.resetWalletBalances(userId);
        transactionRepository.resetTransactions(userId);
    }
}
