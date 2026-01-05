package com.github.dawidwaloch.cryptosim.cryptosim_backend.assets;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(length = 5, nullable = false, unique = true)
    String symbol;

    @Column(length = 50, nullable = false)
    String name;

    @Column(name = "current_price", precision = 19, scale = 4, nullable = false)
    BigDecimal currentPrice;

    @Column(length = 20, nullable = false)
    String type;

    @Column(name = "is_active", nullable = false)
    Boolean isActive;

    @Column(name = "updated_at", nullable = false)
    Timestamp updatedAt;
}
