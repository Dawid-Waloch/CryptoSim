package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public RegisterResponseDTO register(@RequestBody RegisterRequestDTO request){
        return userService.register(request.username(), request.email(), request.password());
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request){
        return userService.login(request.username(), request.password());
    }
}
