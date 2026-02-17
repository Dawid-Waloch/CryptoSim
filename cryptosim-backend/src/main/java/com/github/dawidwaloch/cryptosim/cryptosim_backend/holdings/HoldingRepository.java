package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import com.github.dawidwaloch.cryptosim.cryptosim_backend.assets.Asset;
import com.github.dawidwaloch.cryptosim.cryptosim_backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoldingRepository extends JpaRepository<Holding, Long> {
    List<Holding> findByUserId(Long userId);
    Optional<Holding> findByUserAndAsset(User user, Asset asset);
    @Modifying(clearAutomatically = true)
    void deleteByUserId(Long userId);
}
