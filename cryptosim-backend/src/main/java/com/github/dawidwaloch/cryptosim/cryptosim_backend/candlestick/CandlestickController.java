package com.github.dawidwaloch.cryptosim.cryptosim_backend.candlestick;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class CandlestickController {
    private final CandlestickService candlestickService;

    @GetMapping("/{assetId}/candles")
    public List<CandlestickDTO> getCandles(
        @PathVariable Long assetId,
        @RequestParam(defaultValue = "1d") String interval
    ) {
        return candlestickService.getCandlesticks(assetId, interval);
    }
}
