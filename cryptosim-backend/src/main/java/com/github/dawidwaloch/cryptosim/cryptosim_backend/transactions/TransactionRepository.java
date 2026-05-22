package com.github.dawidwaloch.cryptosim.cryptosim_backend.transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t WHERE t.disabled = FALSE AND t.user.id = :userId")
    List<Transaction> findByUserId(@Param("userId") Long userId);
    @Query("SELECT t FROM Transaction t WHERE t.disabled = FALSE AND t.user.id = :userId AND t.asset.id = :assetId")
    List<Transaction> findByUserIdAndAssetId(@Param("userId") Long userId, @Param("assetId") Long assetId);
    List<Transaction> findByAssetIdOrderByCreatedAtAsc(Long assetId);
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Transaction t SET t.disabled = TRUE WHERE t.user.id = :userId")
    void resetTransactions(@Param("userId") Long userId);
}
