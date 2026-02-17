package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginRequestDTO(

        @Schema(
                description = "Username of the user",
                example = "dawid123"
        )
        String username,

        @Schema(
                description = "User password",
                example = "password123"
        )
        String password
) {}
