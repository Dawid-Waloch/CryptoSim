package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetPriceHistoryService {
    private final AssetPriceHistoryRepository assetPriceHistoryRepository;
    private final AssetPriceHistoryMapper mapper;

    public List<AssetPricecHistoryDTO> getAssetHistory(Long assetId){
        return assetPriceHistoryRepository.findByAssetId(assetId).stream().map(mapper::toDto).toList();
    }
}
