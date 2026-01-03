-- liquibase formatted sql

--changeset maszko:1
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--changeset Dawid-Waloch:2
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    balance DECIMAL(19,2) NOT NULL DEFAULT 100,
    locked_balance DECIMAL(19,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    is_active BOOLEAN NOT NULL DEFAULT true
)

--changeset maszko:2
CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(5) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    current_price DECIMAL(19,4) NOT NULL DEFAULT 50,
    type VARCHAR(20) NOT NULL DEFAULT 'CRYPTO',
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMP NOT NULL DEFAULT now()
)