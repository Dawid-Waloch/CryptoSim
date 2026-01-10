package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PortfolioMapper {
    public PortfolioItemDto toDto(Holding holding){
        Asset asset = holding.getAsset();
        BigDecimal quantity = holding.getQuantity();
        BigDecimal currentPrice = asset.getCurrentPrice();
        BigDecimal value = quantity.multiply(currentPrice);
        return new PortfolioItemDto(
                asset.getId(),
                asset.getSymbol(),
                asset.getName(),
                quantity,
                currentPrice,
                value
        );
    }

    public String formatBigDecimal(BigDecimal number){
        number = number.stripTrailingZeros();

        if(number.scale() < 0){
            number = number.setScale(0);
        }
        return number.toPlainString();
    }
}
