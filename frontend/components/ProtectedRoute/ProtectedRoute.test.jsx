import { afterEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "../../tests/test-utils";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../../context/AuthContext";

vi.mock('../../context/AuthContext');

const mockReplace = vi.fn();

vi.mock("next/router", () => ({
    useRouter: () => ({ replace: mockReplace }),
}));

describe('ProtectedRoute Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders nothing when auth state is loading', () => {
        vi.mocked(useAuth).mockReturnValue({
            user: undefined
        });

        const { container } = render(
            <ProtectedRoute>Child</ProtectedRoute>
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders nothing and redirects unauthenticated users to login page', async () => {
        vi.mocked(useAuth).mockReturnValue({
            user: null
        });

        const { container } = render(
            <ProtectedRoute>Child</ProtectedRoute>
        );

        await waitFor(() => {
            expect(mockReplace).toHaveBeenNthCalledWith(1, '/login');
        });

        expect(container.firstChild).toBeNull();
    });

    it("renders children when user is authenticated", () => {
        vi.mocked(useAuth).mockReturnValue({
            user: 'John'
        });

        const { container } = render(
            <ProtectedRoute>Child</ProtectedRoute>
        );

        expect(container.firstChild).not.toBeNull();
    });
});