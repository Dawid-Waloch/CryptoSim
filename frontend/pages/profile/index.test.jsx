import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";

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
});