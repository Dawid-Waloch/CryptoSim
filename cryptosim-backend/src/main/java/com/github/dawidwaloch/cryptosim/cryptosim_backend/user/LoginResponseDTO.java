package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponseDTO(

        @Schema(
                description = "Indicates whether the login was successful",
                example = "true"
        )
        Boolean success,

        @Schema(
                description = "Message describing the login result",
                example = "Login successful"
        )
        String message,

        @Schema(
                description = "Username of the logged-in user (present only on success)",
                example = "dawid123"
        )
        String username,

        @Schema(
                description = "ID of the logged-in user (present only on success)",
                example = "1"
        )
        Long userId,

        @Schema(
                description = "E-mail of the logged-in user (present only on success)",
                example = "dawid@wp.pl"
        )
        String email
) {}