package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HoldingService {
    private final HoldingRepository holdingRepository;

    public void add(User user, Asset asset, BigDecimal quantity){
        if (quantity.compareTo(BigDecimal.ZERO) <= 0) throw new IllegalArgumentException("Quantity must be positive");

        Optional<Holding> optionalHolding = holdingRepository.findByUserAndAsset(user, asset);
        Holding holding;

        if(optionalHolding.isPresent()) {
            holding = optionalHolding.get();
            holding.setQuantity(holding.getQuantity().add(quantity));
        } else {
            holding = Holding.create(user, asset, quantity);
        }

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
