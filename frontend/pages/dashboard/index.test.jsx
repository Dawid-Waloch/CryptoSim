import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";

describe('Dashboard Page Integration', () => {
    let mockAssetsWallet = [
        { assetId: 1, currentPrice: 5, name: 'Bitcoin', quantity: 2, symbol: 'BTC', value: 10 },
        { assetId: 2, currentPrice: 2, name: 'XRP', quantity: 4, symbol: 'XRP', value: 8 }
    ];

    let mockWallets = [
        { balance: 90, currency: 'USD', id: 9, isActive: true, lockedBalance: 0 }
    ];

    let mockAssetInfo = {
        assetId: 1,
        currentPrice: 5,
        name: 'Bitcoin',
        quantity: 1,
        symbol: 'BTC',
        value: 5
    };

    let mockAssetPriceHistory = [
        { startTime: '2026-01-14T00:00:00', close: 5, high: 7, open: 6, low: 4 },
        { startTime: '2026-01-15T00:00:00', close: 6, high: 9, open: 8, low: 2 },
        { startTime: '2026-01-16T00:00:00', close: 7, high: 10, open: 3, low: 3 },
        { startTime: '2026-01-17T00:00:00', close: 5, high: 7, open: 6, low: 4 },
    ];

    let mockRecentTransactions = [
        { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 5, quantity: 2, value: 10, type: 'BUY', disabled: false, createdAt: '2026-03-22T20:15:23.536779' },
        { id: 1, name: 'Ethereum', symbol: 'ETH', price: 3, quantity: 2, value: 6, type: 'SELL', disabled: false, createdAt: '2026-03-23T20:15:23.536779' }
    ];

    it('renders the main dashboard elements', () => {
        render(
            <DashboardContainer
                wallets={mockWallets}
                assetsWallet={mockAssetsWallet}
                assetInfo={mockAssetInfo}
                assetPriceHistory={mockAssetPriceHistory}
                recentTransactions={mockRecentTransactions}
            />
        );

        expect(screen.getByText(new RegExp(`welcome, dawid`, 'i'))).toBeInTheDocument();

        expect(screen.getByText(/account balance/i)).toBeInTheDocument();
        expect(screen.getByText(/market overview/i)).toBeInTheDocument();
        expect(screen.getByText(/recent transactions/i)).toBeInTheDocument();
        expect(screen.getByText(/price chart/i)).toBeInTheDocument();
    });

    it('renders when user have sth on profile', () => {
        render(
            <DashboardContainer
                wallets={mockWallets}
                assetsWallet={mockAssetsWallet}
                assetInfo={mockAssetInfo}
                assetPriceHistory={mockAssetPriceHistory}
                recentTransactions={mockRecentTransactions}
            />
        );

        // Account Balance
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        
        // Market Overview & Recent Transactions
        const tables = screen.getAllByRole('table');
        expect(tables).toHaveLength(3);
    });
});