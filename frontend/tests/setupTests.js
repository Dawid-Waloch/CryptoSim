import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
));

vi.mock('next/router', () => ({
    useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
        query: {},
    }))
}));

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(() => ({
        user: {
            userId: 1,
            username: 'dawid',
            email: 'dawid@wp.pl'
        },
        login: vi.fn()
    }))
}));

vi.mock('../context/ToastContext', () => ({
    useToast: vi.fn(() => ({
        setFlashMessage: vi.fn(),
        clearFlashMessage: vi.fn(),
    }))
}));

vi.mock('../context/AssetContext', () => ({
    useAsset: vi.fn(() => ({
        selectedAsset: 1,
        setSelectedAsset: vi.fn(),
    }))
}));

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
