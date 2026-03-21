import { describe, it, expect, vi } from "vitest";
import { customRender, screen } from "../../tests/test-utils";
import PriceChart from "./PriceChart";

vi.mock("lightweight-charts", () => ({
    createChart: vi.fn(() => ({
        addSeries: vi.fn(() => ({
            setData: vi.fn(),
        })),
        timeScale: vi.fn(() => ({
            fitContent: vi.fn(),
        })),
        remove: vi.fn(),
    })),
    CandlestickSeries: {},
}));

describe('PriceChart Component', () => {
    const mockAssetInfo = {
        name: 'Bitcoin',
        symbol: 'BTC'
    };

    const mockAssetPriceHistory = [
        { close: 5, high: 5, low: 5, open: 5, startTime: "2026-01-15T00:00:00" },
        { close: 9, high: 10, low: 5, open: 7, startTime: "2026-01-16T00:00:00" },
        { close: 11, high: 15, low: 4, open: 5, startTime: "2026-01-17T00:00:00" }
    ];

    const mockNegativeChange = [
        { close: 5, high: 5, low: 5, open: 5, startTime: "2026-01-15T00:00:00" },
        { close: 2, high: 2, low: 1, open: 1, startTime: "2026-01-16T00:00:00" }
    ];

    const mockPositiveChange = [
        { close: 2, high: 2, low: 1, open: 1, startTime: "2026-01-15T00:00:00" },
        { close: 5, high: 5, low: 5, open: 5, startTime: "2026-01-16T00:00:00" }
    ];

    const currentPrice = mockAssetPriceHistory[mockAssetPriceHistory.length - 1]?.close;
    const previousPrice = mockAssetPriceHistory[mockAssetPriceHistory.length - 2]?.close;
    const change = (currentPrice - previousPrice).toFixed(2);
    const percentageChange = (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2);

    it('renders asset info with current price, change and percentage change', () => {
        customRender(<PriceChart assetInfo={mockAssetInfo} assetPriceHistory={mockAssetPriceHistory} />);

        const priceInfo = screen.getByTestId('price-info');
        expect(screen.getByText(mockAssetInfo.name)).toBeInTheDocument();
        expect(priceInfo).toHaveTextContent(currentPrice);
        expect(priceInfo).toHaveTextContent(change);
        expect(priceInfo).toHaveTextContent(percentageChange);

    });

    it('renders negative price change', () => {
        customRender(<PriceChart assetInfo={mockAssetInfo} assetPriceHistory={mockNegativeChange} />);

        const priceInfo = screen.getByTestId('price-info');
        expect(priceInfo.textContent).toMatch(/-\d+/);
    });

    it('renders positive price change', () => {
        customRender(<PriceChart assetInfo={mockAssetInfo} assetPriceHistory={mockPositiveChange} />);

        const priceInfo = screen.getByTestId('price-info');
        expect(priceInfo.textContent).toMatch(/\+\d+/);
    });
});