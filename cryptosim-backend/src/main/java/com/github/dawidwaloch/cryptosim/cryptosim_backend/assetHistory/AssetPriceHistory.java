package com.github.dawidwaloch.cryptosim.cryptosim_backend.assetHistory;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "asset_price_history")
public class AssetPriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @Column(precision = 19, scale = 4, nullable = false)
    private BigDecimal price;

    @Column(name = "recorded_at", nullable = false)
    private Timestamp recordedAt;
}
