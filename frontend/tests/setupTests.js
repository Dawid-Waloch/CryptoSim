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

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(() => ({
        user: {
            userId: 1,
            username: 'dawid',
            email: 'dawid@wp.pl'
        }
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
        setSelectedAsset: vi.fn(),
    }))
}));
