package com.github.dawidwaloch.cryptosim.cryptosim_backend.candlestick;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

import org.springframework.stereotype.Service;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions.Transaction;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandlestickService {
    private final TransactionRepository transactionRepository;

    public List<CandlestickDTO> getCandlesticks(Long assetId, String interval) {
        List<Transaction> transactions = transactionRepository.findByAssetIdOrderByCreatedAtAsc(assetId);

        ChronoUnit chronoUnit;
        switch(interval) {
            case "1m": chronoUnit = ChronoUnit.MINUTES; break;
            case "1h": chronoUnit = ChronoUnit.HOURS; break;
            case "1d": chronoUnit = ChronoUnit.DAYS; break;
            default: throw new IllegalArgumentException("Unknown interval: " + interval);
        }

        Map<LocalDateTime, List<Transaction>> buckets = new TreeMap<>();
        for(Transaction t: transactions) {
            LocalDateTime bucketStart = truncateToInterval(t.getCreatedAt(), chronoUnit);
            buckets.computeIfAbsent(bucketStart, k -> new ArrayList<>()).add(t);
        }

        List<CandlestickDTO> candlesticks = new ArrayList<>();
        for(Map.Entry<LocalDateTime, List<Transaction>> entry: buckets.entrySet()) {
            List<Transaction> bucketTransactions = entry.getValue();
            if(bucketTransactions.isEmpty()) continue;

            BigDecimal open = bucketTransactions.get(0).getPrice();
            BigDecimal close = bucketTransactions.get(bucketTransactions.size() - 1).getPrice();
            BigDecimal low = bucketTransactions.stream().map(Transaction::getPrice).min(BigDecimal::compareTo).orElse(open);
            BigDecimal high = bucketTransactions.stream().map(Transaction::getPrice).max(BigDecimal::compareTo).orElse(open);

            candlesticks.add(new CandlestickDTO(entry.getKey(), low, open, close, high));
        }

        return candlesticks;
    }

    public LocalDateTime truncateToInterval(LocalDateTime dateTime, ChronoUnit unit) {
        switch(unit) {
            case MINUTES: return dateTime.withSecond(0).withNano(0);
            case HOURS: return dateTime.withMinute(0).withSecond(0).withNano(0);
            case DAYS: return dateTime.withHour(0).withMinute(0).withSecond(0).withNano(0);
            default: throw new IllegalArgumentException("Unsupported unit: " + unit);
        }
    }
}
