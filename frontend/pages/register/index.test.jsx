import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useToast } from "../../context/ToastContext";
import RegisterPage from ".";
import { useRouter } from "next/router";

describe('Register Page Integration', () => {
    const mockUser = {
        username: 'dawid',
        email: 'dawid@wp.pl',
        password: '12345678'
    };

    const mockSetFlashMessage = vi.fn();

    const mockPush = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

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

    it('renders toast when user successfully register', async () => {
        vi.mocked(useToast).mockReturnValue({
            setFlashMessage: mockSetFlashMessage
        });

        vi.mocked(useRouter).mockReturnValue({
            push: mockPush
        });

        render(<RegisterPage />);

        fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ success: true })
        });

        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('E-mail');
        const passwordInput = screen.getByPlaceholderText('Password');
        const repeatPasswordInput = screen.getByPlaceholderText('Repeat password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(usernameInput, mockUser.username);
        await userEvent.type(emailInput, mockUser.email);
        await userEvent.type(passwordInput, mockUser.password);
        await userEvent.type(repeatPasswordInput, mockUser.password);
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSetFlashMessage).toHaveBeenCalledWith({
                type: 'success',
                message: 'Registration success'
            });
        });

        expect(mockPush).toHaveBeenCalledWith('/login');
    });

    it.each([
        { typeOfData: 'email'},
        { typeOfData: 'username'}
    ])('renders error toast when users $typeOfData already exist', async () => {
        vi.mocked(useToast).mockReturnValue({
            setFlashMessage: mockSetFlashMessage
        });

        render(<RegisterPage />);

        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: '$typeOfData already exists' })
        });

        const usernameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('E-mail');
        const passwordInput = screen.getByPlaceholderText('Password');
        const repeatPasswordInput = screen.getByPlaceholderText('Repeat password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(usernameInput, mockUser.username);
        await userEvent.type(emailInput, mockUser.email);
        await userEvent.type(passwordInput, mockUser.password);
        await userEvent.type(repeatPasswordInput, mockUser.password);
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSetFlashMessage).toHaveBeenCalledWith({
                type: 'error',
                message: '$typeOfData already exists'
            });
        });
    });
});