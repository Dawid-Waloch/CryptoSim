package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetPriceHistoryService {
    private final AssetPriceHistoryRepository assetPriceHistoryRepository;
    private final AssetPriceHistoryMapper mapper;

    public List<AssetPricecHistoryDTO> getAssetHistory(Long assetId){
        return assetPriceHistoryRepository.findByAssetId(assetId).stream().map(mapper::toDto).toList();
    }

    public void saveAssetPrice(Asset asset){
        AssetPriceHistory history = new AssetPriceHistory();
        history.setAsset(asset);
        history.setPrice(asset.getCurrentPrice());
        history.setRecordedAt(LocalDateTime.now());

        assetPriceHistoryRepository.save(history);
    }
}
