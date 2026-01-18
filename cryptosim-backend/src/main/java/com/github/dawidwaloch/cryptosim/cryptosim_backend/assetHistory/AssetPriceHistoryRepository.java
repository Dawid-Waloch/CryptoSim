package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetPriceHistoryRepository extends JpaRepository<AssetPriceHistory, Long> {
    List<AssetPriceHistory> findByAssetId(Long assetId);
}
