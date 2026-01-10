package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class HoldingService {
    private final HoldingRepository holdingRepository;

    public void add(User user, Asset asset, BigDecimal quantity){
        if (quantity.compareTo(BigDecimal.ZERO) <= 0) throw new IllegalArgumentException("Quantity must be positive");

        Holding holding = holdingRepository.findByUserAndAsset(user, asset).orElseGet(() -> {
            return Holding.create(user, asset, quantity);
        });

        holding.setQuantity(holding.getQuantity().add(quantity));
        holdingRepository.save(holding);
    }

    public void remove(User user, Asset asset, BigDecimal quantity){
        if (quantity.compareTo(BigDecimal.ZERO) <= 0) throw new IllegalArgumentException("Quantity must be positive");

        Holding holding = holdingRepository.findByUserAndAsset(user, asset).orElseThrow(() -> new IllegalStateException("No holdings for this asset to remove"));

        if (holding.getQuantity().compareTo(quantity) < 0) throw new IllegalStateException("Not enough holdings to sell");

        holding.setQuantity(holding.getQuantity().subtract(quantity));

        if (holding.getQuantity().compareTo(BigDecimal.ZERO) == 0){
            holdingRepository.delete(holding);
        }
        else {
            holdingRepository.save(holding);
        }
    }
}
