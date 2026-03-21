import { afterEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "../../tests/test-utils";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

describe('ProtectedRoute Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    const mockReplace = vi.fn();

    it('renders nothing when auth state is loading', () => {
        vi.mocked(useAuth).mockReturnValueOnce({
            user: undefined
        });

        const { container } = render(
            <ProtectedRoute>Child</ProtectedRoute>
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders nothing and redirects unauthenticated users to login page', async () => {
        vi.mocked(useAuth).mockReturnValueOnce({
            user: null
        });

        vi.mocked(useRouter).mockReturnValue({
            replace: mockReplace
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
        const { container } = render(
            <ProtectedRoute>Child</ProtectedRoute>
        );

        expect(container.firstChild).not.toBeNull();
    });
});