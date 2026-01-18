package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Price History")
@RestController
@RequiredArgsConstructor
public class AssetPriceHistoryController {
    private final AssetPriceHistoryService assetPriceHistoryService;

    @Operation(summary = "get asset price history")
    @GetMapping("/assets/{assetId}/history")
    public List<AssetPricecHistoryDTO> getAssetHistory(@Parameter(description = "Asset ID", example = "1") @PathVariable Long assetId){
        return assetPriceHistoryService.getAssetHistory(assetId);
    }
}
