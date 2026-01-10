package com.github.dawidwaloch.cryptosim.cryptosim_backend.holdings;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {
    private final HoldingRepository holdingRepository;
    private final PortfolioMapper mapper;

    public List<PortfolioItemDto> getPortfolioForUser(Long userId){
        return holdingRepository.findByUserId(userId).stream().map(mapper::toDto).toList();
    }
}
