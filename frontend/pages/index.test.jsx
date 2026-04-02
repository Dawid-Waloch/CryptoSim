import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAuth } from "../context/AuthContext";
import LandingPage from ".";

describe('Landing Page Integration', () => {
    it('redirects to dashboard page when user is logged in', async () => {
        render(<LandingPage />);

        const link = screen.getByRole('link', { name: /start trading/i });

        expect(link).toHaveAttribute('href', '/dashboard');
    });
});