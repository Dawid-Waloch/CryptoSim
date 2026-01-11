package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/buy")
    public ResponseEntity<String> buy(@RequestBody BuySellRequestDTO request){
        transactionService.buy(request.userId(), request.assetId(), request.quantity());
        return ResponseEntity.status(HttpStatus.CREATED).body("Asset bought successfully");
    }

    @PostMapping("/sell")
    public ResponseEntity<String> sell(@RequestBody BuySellRequestDTO request) {
        transactionService.sell(request.userId(), request.assetId(), request.quantity());
        return ResponseEntity.status(HttpStatus.CREATED).body("Asset sold successfully");
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
