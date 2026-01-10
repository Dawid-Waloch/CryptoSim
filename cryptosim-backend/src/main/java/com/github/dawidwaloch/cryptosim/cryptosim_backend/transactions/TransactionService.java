package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.AssetService;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings.HoldingService;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.user.User;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.user.UserService;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final WalletService walletService;
    private final HoldingService holdingService;
    private final AssetService assetService;
    private final UserService userService;
    private final TransactionMapper mapper;

    public void buy(Long userId, Long assetId, BigDecimal quantity){
        User user = userService.getUserById(userId);
        Asset asset = assetService.getAssetById(assetId);

        BigDecimal cost = asset.getCurrentPrice().multiply(quantity);

        walletService.withdraw(userId, cost);
        holdingService.add(user, asset, quantity);

        transactionRepository.save(Transaction.buy(user, asset, quantity, cost));
    }

    public void sell(Long userId, Long assetId, BigDecimal quantity){
        User user = userService.getUserById(userId);
        Asset asset = assetService.getAssetById(assetId);

        holdingService.remove(user, asset, quantity);

        BigDecimal income = asset.getCurrentPrice().multiply(quantity);
        walletService.deposit(userId, income);

        transactionRepository.save(Transaction.buy(user, asset, quantity, asset.getCurrentPrice()));
    }

    public List<TransactionDTO> getTransactions(Long userId){
        return transactionRepository.findByUserId(userId).stream().map(mapper::toDTO).toList();
    }

    public List<TransactionDTO> getTransactionsByAssetId(Long userId, Long assetId){
        return transactionRepository.findByUserIdAndAssetId(userId, assetId).stream().map(mapper::toDTO).toList();
    }
}
