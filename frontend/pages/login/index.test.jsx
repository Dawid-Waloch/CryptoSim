import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { ToastProvider } from "../../context/ToastContext";
import FlashMessageListener from "../../components/FlashMessageListener/FlashMessageListener";
import LoginPage from ".";
import { useAuth } from "../../context/AuthContext";

vi.unmock('../../context/ToastContext');

describe('Login Page Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockPush = vi.fn();
    const mockLogin = vi.fn();
    const mockUser = {
        username: 'dawid', 
        userId: 1, 
        email: 'dawid@wp.pl' 
    }

    it('renders all kind of errors', async () => {
        render(
            <ToastProvider>
                <Toaster />
                <FlashMessageListener />
                <LoginPage />
            </ToastProvider>
        );

        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.click(submitButton);
        
        expect(screen.getByText(/fill the username field/i)).toBeInTheDocument();
        expect(screen.getByText(/fill the password field/i)).toBeInTheDocument();
    });

    it('renders toast when user not found', async () => {
        const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'User not found' }),
        });
        
        render(
            <ToastProvider>
                <Toaster />
                <FlashMessageListener />
                <LoginPage />
            </ToastProvider>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(usernameInput, 'da');
        await userEvent.type(passwordInput, 'da');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/user not found/i)).toBeInTheDocument();

        mockFetch.mockRestore();
    });

    it('renders toast when password is invalid', async () => {
        const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Invalid password' }),
        });
        
        render(
            <ToastProvider>
                <Toaster />
                <FlashMessageListener />
                <LoginPage />
            </ToastProvider>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(usernameInput, 'dawid');
        await userEvent.type(passwordInput, '123');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/invalid password/i)).toBeInTheDocument();

        mockFetch.mockRestore();
    });

    it('renders toast when login success and forwards to dashboard page', async () => {
        const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => ({  
                ...mockUser
            }),
        });

        vi.mocked(useRouter).mockReturnValue({
            push: mockPush
        });

        vi.mocked(useAuth).mockReturnValue({
            login: mockLogin
        });
        
        render(
            <ToastProvider>
                <Toaster />
                <FlashMessageListener />
                <LoginPage />
            </ToastProvider>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(usernameInput, 'dawid');
        await userEvent.type(passwordInput, '12345678');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/login success/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ username: mockUser.username, userId: mockUser.userId, email: mockUser.email });
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/dashboard');
        });

        mockFetch.mockRestore();
    });
});