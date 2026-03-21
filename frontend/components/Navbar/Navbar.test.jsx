import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../tests/test-utils";
import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";

describe('Navbar Component', () => {
    it('renders navbar for non logged user', () => {
        vi.mocked(useAuth).mockReturnValueOnce({
            user: null
        });

        render(<Navbar />);

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('renders navbar for logged user', () => {
        render(<Navbar />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Market')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});