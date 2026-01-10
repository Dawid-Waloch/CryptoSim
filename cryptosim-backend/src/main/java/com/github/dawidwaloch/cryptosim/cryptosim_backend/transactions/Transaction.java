package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "transactions", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "asset_id"})
})
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false)
    Asset asset;

    @Column(length = 10, nullable = false)
    String type;

    @Column(precision = 19, scale = 8, nullable = false)
    BigDecimal quantity;

    @Column(precision = 19, scale = 4, nullable = false)
    BigDecimal price;

    @Column(name = "created_at", nullable = false)
    Timestamp createdAt;
}
