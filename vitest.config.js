import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './frontend/tests/setupTests.js',
        include: ['frontend/**/*.test.{js,jsx}'],
    },
});