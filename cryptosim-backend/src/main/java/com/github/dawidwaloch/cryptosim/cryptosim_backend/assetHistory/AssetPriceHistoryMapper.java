package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import org.springframework.stereotype.Component;

@Component
public class AssetPriceHistoryMapper {
    public AssetPricecHistoryDTO toDto(AssetPriceHistory a){
        return new AssetPricecHistoryDTO(
                a.getPrice(),
                a.getRecordedAt()
        );
    }
}
