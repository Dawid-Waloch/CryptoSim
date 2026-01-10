package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/buy")
    public void buy(@RequestBody BuySellRequestDTO request){
        transactionService.buy(request.userId(), request.assetId(), request.quantity());
    }

    @PostMapping("/sell")
    public void sell(@RequestBody BuySellRequestDTO request) {
        transactionService.sell(request.userId(), request.assetId(), request.quantity());
    }

    @GetMapping
    public List<TransactionDTO> getTransactions(@RequestParam Long userId, @RequestParam(required = false) Long assetId){
        if (assetId != null){
            return transactionService.getTransactionsByAssetId(userId, assetId);
        }
        else {
            return transactionService.getTransactions(userId);
        }
    }
}
