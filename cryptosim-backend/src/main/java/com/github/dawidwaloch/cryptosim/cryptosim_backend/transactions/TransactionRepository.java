package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
    List<Transaction> findByUserIdAndAssetId(Long userId, Long assetId);
    List<Transaction> findByAssetIdOrderByCreatedAtAsc(Long assetId);
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Transaction t SET t.disabled = TRUE WHERE t.user.id = :userId")
    void resetTransactions(@Param("userId") Long userId);
}
