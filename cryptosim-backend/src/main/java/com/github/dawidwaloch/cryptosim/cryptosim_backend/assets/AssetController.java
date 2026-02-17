package com.github.dawidwaloch.cryptosim.cryptosim_backend.assets;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Assets")
@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;

    @Operation(summary = "Get all assets")
    @GetMapping
    public List<Asset> getAssets(@Parameter(description = "type of asset", example = "CRYPTO") @RequestParam(required = false) String type){
        if (type != null){
            return assetService.getAssetsByType(type);
        }
        return assetService.getAllAssets();
    }
}
