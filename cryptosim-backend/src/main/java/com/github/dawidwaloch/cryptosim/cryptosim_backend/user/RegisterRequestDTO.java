package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDTO(
        @NotBlank String username,
        @Email String email,
        @NotBlank String password
) {}