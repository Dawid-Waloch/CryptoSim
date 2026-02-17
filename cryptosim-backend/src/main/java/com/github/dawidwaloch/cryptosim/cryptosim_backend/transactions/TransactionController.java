package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Transactions")
@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @Operation(summary = "Buy asset", description = "Buys given quantity of an asset for the current user")
    @PostMapping("/buy")
    public ResponseEntity<String> buy(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Buy request data",
                    required = true
            )
            @RequestBody BuySellRequestDTO request
    ){
        transactionService.buy(request.userId(), request.assetId(), request.quantity());
        return ResponseEntity.status(HttpStatus.CREATED).body("Asset bought successfully");
    }

    @Operation(summary = "Sell asset", description = "Sells given quantity of an asset for the current user")
    @PostMapping("/sell")
    public ResponseEntity<String> sell(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Sell request data",
                    required = true
            )
            @RequestBody BuySellRequestDTO request
    ) {
        transactionService.sell(request.userId(), request.assetId(), request.quantity());
        return ResponseEntity.status(HttpStatus.CREATED).body("Asset sold successfully");
    }

    @Operation(summary = "Get transactions history")
    @GetMapping
    public List<TransactionDTO> getTransactions(
            @Parameter(description = "User ID", example = "1") @RequestParam Long userId,
            @Parameter(description = "Asset ID", example = "2") @RequestParam(required = false) Long assetId
    ){
        if (assetId != null){
            return transactionService.getTransactionsByAssetId(userId, assetId);
        }
        else {
            return transactionService.getTransactions(userId);
        }
    }
}
