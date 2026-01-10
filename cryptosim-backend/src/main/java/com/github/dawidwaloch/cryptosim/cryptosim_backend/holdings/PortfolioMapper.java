package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PortfolioMapper {
    public PortfolioItemDto toDto(Holding holding){
        Asset asset = holding.getAsset();
        BigDecimal value = holding.getQuantity().multiply(asset.getCurrentPrice());
        return new PortfolioItemDto(
                asset.getId(),
                asset.getSymbol(),
                asset.getName(),
                holding.getQuantity(),
                asset.getCurrentPrice(),
                value
        );
    }
}
