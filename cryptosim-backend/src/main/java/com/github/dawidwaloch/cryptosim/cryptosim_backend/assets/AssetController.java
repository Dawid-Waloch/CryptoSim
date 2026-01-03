package com.github.dawidwaloch.cryptosim.cryptosim_backend.assets;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;

    @GetMapping
    public List<Asset> getAssets(@RequestParam(required = false) String type){
        if (type != null){
            return assetService.getAssetsByType(type);
        }
        return assetService.getAllAssets();
    }
}
