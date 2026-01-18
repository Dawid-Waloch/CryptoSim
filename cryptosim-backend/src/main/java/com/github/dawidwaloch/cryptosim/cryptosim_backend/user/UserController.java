package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "Register user")
    @PostMapping("/register")
    public RegisterResponseDTO register(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Register data",
                    required = true
            )
            @RequestBody RegisterRequestDTO request
    ){
        return userService.register(request.username(), request.email(), request.password());
    }

    @Operation(summary = "Login user")
    @PostMapping("/login")
    public LoginResponseDTO login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Login data",
                    required = true
            )
            @RequestBody LoginRequestDTO request
    ){
        return userService.login(request.username(), request.password());
    }
}
