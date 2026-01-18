package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import io.swagger.v3.oas.annotations.media.Schema;

public record RegisterRequestDTO(

        @Schema(
                description = "Unique username chosen by the user",
                example = "dawid123"
        )
        String username,

        @Schema(
                description = "User email address",
                example = "dawid@example.com"
        )
        String email,

        @Schema(
                description = "User password",
                example = "password123"
        )
        String password
) {}