package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AssetPriceHistoryController {
    private final AssetPriceHistoryService assetPriceHistoryService;

    @GetMapping("/assets/{assetId}/history")
    public List<AssetPricecHistoryDTO> getAssetHistory(@PathVariable Long assetId){
        return assetPriceHistoryService.getAssetHistory(assetId);
    }
}
