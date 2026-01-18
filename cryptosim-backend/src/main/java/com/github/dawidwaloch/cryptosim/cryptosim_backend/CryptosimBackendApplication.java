package com.github.dawidwaloch.cryptosim.cryptosim_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CryptosimBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CryptosimBackendApplication.class, args);
	}

}
