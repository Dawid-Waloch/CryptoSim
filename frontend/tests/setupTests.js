import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
));

vi.mock('next/router', () => ({
  useRouter: () => ({ push: vi.fn(), query: {} }),
}));
