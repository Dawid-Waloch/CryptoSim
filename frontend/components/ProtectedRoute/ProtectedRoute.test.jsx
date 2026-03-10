import { describe, expect, it, vi } from "vitest";
import { customRender, screen } from "../../tests/test-utils";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../../context/AuthContext";

vi.mock('../../context/AuthContext');

describe('ProtectedRoute Component', () => {
    it('renders nothing when auth state is loading', () => {
        vi.mocked(useAuth).mockReturnValue({
            user: undefined
        });

        const { container } = customRender(<ProtectedRoute>Child</ProtectedRoute>);

        expect(container.firstChild).toBeNull();
    });
});