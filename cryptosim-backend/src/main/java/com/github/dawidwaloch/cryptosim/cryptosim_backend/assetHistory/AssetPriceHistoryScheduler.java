package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AssetPriceHistoryScheduler {
    private final AssetService assetService;
    private final AssetPriceHistoryService assetPriceHistoryService;

    // Save price at 8:00 and 20:00 every day
    @Scheduled(cron = "0 0 8,20 * * *", zone = "Europe/Warsaw")
    public void savePriceHistory(){
        assetService.getAllAssets().forEach(assetPriceHistoryService::saveAssetPrice);
    }
}
