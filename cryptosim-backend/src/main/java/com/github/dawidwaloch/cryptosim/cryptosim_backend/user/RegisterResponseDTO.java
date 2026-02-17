package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import io.swagger.v3.oas.annotations.media.Schema;

public record RegisterResponseDTO(

        @Schema(
                description = "Indicates whether the registration was successful",
                example = "true"
        )
        Boolean success,

        @Schema(
                description = "Message describing the registration result",
                example = "User registered successfully"
        )
        String message,

        @Schema(
                description = "Username of the newly registered user (present only on success)",
                example = "dawid123"
        )
        String username
) {}