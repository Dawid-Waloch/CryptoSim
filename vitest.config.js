import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './frontend/tests/setupTests.js',
        include: ['frontend/**/*.test.{js,jsx}'],
    },
});