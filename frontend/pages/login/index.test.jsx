import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useToast } from "../../context/ToastContext";
import LoginPage from ".";

describe('Login Page Integration', () => {
    it('renders message when inputs are not filled', async () => {
        render(<LoginPage />);

        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.click(submitButton);
        
        expect(screen.getByText(/fill the username field/i)).toBeInTheDocument();
        expect(screen.getByText(/fill the password field/i)).toBeInTheDocument();
    });
});