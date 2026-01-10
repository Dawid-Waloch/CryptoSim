package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "holdings", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "asset_id"})
})
public class Holding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false)
    Asset asset;

    @Column(precision = 19, scale = 8, nullable = false)
    BigDecimal quantity;
}
