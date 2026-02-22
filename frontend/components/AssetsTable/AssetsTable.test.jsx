import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender, screen } from "../../tests/test-utils";
import AssetsTable from "./AssetsTable";

describe('AssetsTable Component', () => {
    const mockAssetsWallet = [
        { assetId: 1, currentPrice: 5, name: 'Bitcoin', quantity: 2, symbol: 'BTC', value: 10 },
        { assetId: 2, currentPrice: 2, name: 'XRP', quantity: 4, symbol: 'XRP', value: 8 }
    ];

    const mockWallets = [
        { balance: 90, currency: 'USD', id: 9, isActive: true, lockedBalance: 0 }
    ];

    it('renders correct number of asset ', () => {
        customRender(<AssetsTable assetsWallet={mockAssetsWallet} wallets={mockWallets} />);

        expect(screen.getAllByText(/bitcoin|xrp/i)).toHaveLength(2);
    });

    it('renders correct number of action buttons per asset', () => {
        customRender(<AssetsTable assetsWallet={mockAssetsWallet} wallets={mockWallets} />);

        expect(screen.getAllByRole('button', { name: /buy/i })).toHaveLength(2);
        expect(screen.getAllByRole('button', { name: /sell/i })).toHaveLength(2);
    });

    it.each([
        { action: "Buy" },
        { action: "Sell" }
    ])('opens modal with correct asset when $action is clicked', async ({ action }) => {
        customRender(<AssetsTable assetsWallet={mockAssetsWallet} wallets={mockWallets} />);

        const buyButtons = screen.getAllByRole('button', { name: new RegExp(action, 'i') });
        await userEvent.click(buyButtons[0]);

        expect(screen.getByText(new RegExp(`${action} bitcoin`, 'i'))).toBeInTheDocument();
    });

    it('closes modal when close icon is clicked', async () => {
        customRender(<AssetsTable assetsWallet={mockAssetsWallet} wallets={mockWallets} />);
        
        const buyButtons = screen.getAllByRole('button', { name: /buy/i });
        await userEvent.click(buyButtons[0]);

        const closeIcon = screen.getByTestId('close-icon');
        await userEvent.click(closeIcon);

        expect(screen.queryByText(/buy bitcoin/i)).not.toBeInTheDocument();
    });
});