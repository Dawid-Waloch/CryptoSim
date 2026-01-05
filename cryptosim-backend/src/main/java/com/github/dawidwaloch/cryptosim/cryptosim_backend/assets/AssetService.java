package com.github.dawidwaloch.cryptosim.cryptosim_backend.assets;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository assetRepository;

    public List<Asset> getAllAssets(){
        return assetRepository.findAll();
    }

    public List<Asset> getAssetsByType(String type){
        return assetRepository.findByType(type);
    }
}
