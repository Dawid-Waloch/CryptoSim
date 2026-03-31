import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from ".";
import userEvent from "@testing-library/user-event";

describe('Register Page Integration', () => {
    it('renders all kind of errors', async () => {
        render(<RegisterPage />);

        const repeatPasswordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });
        
        await userEvent.type(repeatPasswordInput, 'a');
        await userEvent.click(submitButton);

        expect(screen.getByText(/fill the username field/i)).toBeInTheDocument();
        expect(screen.getByText(/your email has to include @/i)).toBeInTheDocument();
        expect(screen.getByText(/your password has to contain more than 7 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/you password and repeat password have to be the same/i)).toBeInTheDocument();
    });
});