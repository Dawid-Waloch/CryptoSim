package com.github.dawidwaloch.cryptosim.cryptosim_backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterResponseDTO register(String username, String email, String password){
        if (userRepository.existsByUsername(username)){
            return new RegisterResponseDTO(false, "Username already exists", null);
        }

        if (userRepository.existsByEmail(email)){
            return new RegisterResponseDTO(false, "Email already exists", null);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return new RegisterResponseDTO(true, "User registered successfully", user.getUsername());
    }

    public LoginResponseDTO login(String username, String password) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        return new LoginResponseDTO(true, "Login successful", user.getUsername());
                    } else {
                        return new LoginResponseDTO(false, "Invalid password", null);
                    }
                })
                .orElse(new LoginResponseDTO(false, "User not found", null));
    }
}