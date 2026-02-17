package com.github.dawidwaloch.cryptosim.cryptosim_backend.wallet;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "wallets")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "user_id", nullable = false)
    Long userId;

    @Column(precision = 19, scale = 2, nullable = false)
    BigDecimal balance = BigDecimal.valueOf(100);

    @Column(name = "locked_balance", precision = 19, scale = 2, nullable = false)
    BigDecimal lockedBalance = BigDecimal.ZERO;

    @Column(length = 3, nullable = false)
    String currency = "USD";

    @Column(name = "is_active", nullable = false)
    boolean isActive = true;
}
