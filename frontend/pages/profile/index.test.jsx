import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
import userEvent from "@testing-library/user-event";

describe('Profile Page Integration', () => {
    const mockUSDWallet = { balance: 90, currency: 'USD', id: 9, isActive: true, lockedBalance: 0 };

    const mockStartBalance = 100;

    const mockHandleLogout = vi.fn();

    const mockResetSimulation = vi.fn();

    it('renders main profile elements', () => {
        render(
            <ProfileContainer
                handleLogout={mockHandleLogout}
                usdWallet={mockUSDWallet}
                resetSimulation={mockResetSimulation}
            />
        );

        expect(screen.getByText(/user info:/i)).toBeInTheDocument();
        expect(screen.getByText(/simulation:/i)).toBeInTheDocument();
    });

    it('renders correct user info', () => {
        render(
            <ProfileContainer
                handleLogout={mockHandleLogout}
                usdWallet={mockUSDWallet}
                resetSimulation={mockResetSimulation}
            />
        );

        expect(screen.getByText('dawid')).toBeInTheDocument();
        expect(screen.getByText('dawid@wp.pl')).toBeInTheDocument();
    });

    it('renders correct balance info', () => {
        render(
            <ProfileContainer
                handleLogout={mockHandleLogout}
                usdWallet={mockUSDWallet}
                resetSimulation={mockResetSimulation}
            />
        );

        expect(screen.getByTestId('wallet-balance')).toHaveTextContent(mockUSDWallet.balance);
        expect(screen.getByTestId('start-balance')).toHaveTextContent(mockStartBalance);
    });

    it('executes function properly when user is clicking logout button', async () => {
        render(
            <ProfileContainer
                handleLogout={mockHandleLogout}
                usdWallet={mockUSDWallet}
                resetSimulation={mockResetSimulation}
            />
        );

        const logoutButton = screen.getByRole('button', { name: /logout/i });
        await userEvent.click(logoutButton);

        expect(mockHandleLogout).toHaveBeenCalled();
    });

    it('executes function properly when user is clicking reset simulation button', async () => {
        render(
            <ProfileContainer
                handleLogout={mockHandleLogout}
                usdWallet={mockUSDWallet}
                resetSimulation={mockResetSimulation}
            />
        );

        const resetSimulationButton = screen.getByRole('button', { name: /reset simulation/i });
        await userEvent.click(resetSimulationButton);

        expect(mockResetSimulation).toHaveBeenCalled();
    });
});