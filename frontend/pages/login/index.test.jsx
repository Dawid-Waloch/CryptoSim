import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import { ToastProvider } from "../../context/ToastContext";
import FlashMessageListener from "../../components/FlashMessageListener/FlashMessageListener";
import LoginPage from ".";

vi.unmock('../../context/ToastContext');

describe('Login Page Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

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
            status: 404,
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
});