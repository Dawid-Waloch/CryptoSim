package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

public record LoginResponseDTO(Boolean success, String message, String username, Long userId) {}
