package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
