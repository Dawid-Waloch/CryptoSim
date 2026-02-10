package com.github.dawidwaloch.cryptosim.cryptosim_backend.candlestick;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "Candles")
@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class CandlestickController {
    private final CandlestickService candlestickService;

    @Operation(summary = "get candles", description = "Gets candles OHLC info for specific assetId and interval")
    @GetMapping("/{assetId}/candles")
    public List<CandlestickDTO> getCandles(
        @Parameter(description = "Asset ID", example = "1")
        @PathVariable Long assetId,

        @Parameter(description = "Interval", example = "1d")
        @RequestParam(defaultValue = "1d") String interval
    ) {
        return candlestickService.getCandlesticks(assetId, interval);
    }
}
