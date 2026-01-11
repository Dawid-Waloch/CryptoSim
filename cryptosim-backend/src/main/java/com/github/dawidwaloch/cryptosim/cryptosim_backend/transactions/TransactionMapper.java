package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {
    public TransactionDTO toDTO(Transaction t){
        return new TransactionDTO(
                t.getId(),
                t.getType(),
                t.getAsset().getSymbol(),
                t.getAsset().getName(),
                t.getQuantity(),
                t.getPrice(),
                t.getQuantity().multiply(t.getPrice()),
                t.getCreatedAt()
        );
    }
}