import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import MarketContainer from "../../components/MarketContainer/MarketContainer";
import userEvent from "@testing-library/user-event";

vi.mock('lightweight-charts', () => ({
    createChart: vi.fn(() => ({
        addSeries: vi.fn(() => ({
            setData: vi.fn(),
        })),
        timeScale: () => ({ fitContent: vi.fn() }),
        remove: vi.fn(),
    })),
    CandlestickSeries: {},
}));

describe('Market Page Integration', () => {
    const mockMarketAssets = [
        { id: 1, name: 'XRP', symbol: 'XRP', currentPrice: 5, type: 'CRYPTO', isActive: true, updatedAt: '2026-01-03T17:54:50.955' },
        { id: 2, name: 'Ethereum', symbol: 'ETH', currentPrice: 2, type: 'CRYPTO', isActive: true, updatedAt: '2026-01-01T17:54:50.955' },
    ];

    const mockUSDWallet = { balance: 90, currency: 'USD', id: 9, isActive: true, lockedBalance: 0 };

    const mockAssetInfo = {
        assetId: 1,
        currentPrice: 5,
        name: 'Bitcoin',
        quantity: 1,
        symbol: 'BTC',
        value: 5
    };

    const mockAssetPriceHistory = [
        { startTime: '2026-01-14T00:00:00', close: 5, high: 7, open: 6, low: 4 },
        { startTime: '2026-01-15T00:00:00', close: 6, high: 9, open: 8, low: 2 },
        { startTime: '2026-01-16T00:00:00', close: 7, high: 10, open: 3, low: 3 },
        { startTime: '2026-01-17T00:00:00', close: 5, high: 7, open: 6, low: 4 },
    ];

    const mockSetSelectedAsset = vi.fn();

    it('renders main market elements', () => {
        render(
            <MarketContainer
                marketAssets={mockMarketAssets}
                setSelectedAsset={mockSetSelectedAsset}
                assetInfo={mockAssetInfo}
                assetPriceHistory={mockAssetPriceHistory}
                usdWallet={mockUSDWallet}
            />
        );

        expect(screen.getByText(/stocks & assets/i)).toBeInTheDocument();
        expect(screen.getByText(/price chart/i)).toBeInTheDocument();
        expect(screen.getByText(/buy form/i)).toBeInTheDocument();
    });
});