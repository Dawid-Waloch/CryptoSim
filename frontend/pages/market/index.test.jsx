import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAsset } from "../../context/AssetContext";
import MarketContainer from "../../components/MarketContainer/MarketContainer";

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

    it('calls correct asset info after clicking specific asset from list', async () => {
        vi.mocked(useAsset).mockReturnValue({
            setSelectedAsset: mockSetSelectedAsset
        });

        render(
            <MarketContainer
                marketAssets={mockMarketAssets}
                setSelectedAsset={mockSetSelectedAsset}
                assetInfo={mockAssetInfo}
                assetPriceHistory={mockAssetPriceHistory}
                usdWallet={mockUSDWallet}
            />
        );

        const xrpButton = screen.getByRole('button', { name: /xrp/i });
        
        await userEvent.click(xrpButton);

        expect(mockSetSelectedAsset).toHaveBeenCalledWith({
            assetId: mockMarketAssets[0].id,
            name: mockMarketAssets[0].name,
            symbol: mockMarketAssets[0].symbol,
            currentPrice: mockMarketAssets[0].currentPrice
        });
    });
});