import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender, screen } from "../../tests/test-utils";
import MarketAssets from "./MarketAssets";

describe('MarketAssets Component', () => {
    const mockSetSelectedAsset = vi.fn();
    const mockMarketAssets = [
        {currentPrice: 5, id: 1, isActive: true, name: 'Bitcoin', symbol: 'BTC', type: 'CRYPTO', updatedAt: '2026-01-03T17:54:50.955'},
        {currentPrice: 3, id: 2, isActive: true, name: 'XRP', symbol: 'XRP', type: 'CRYPTO', updatedAt: '2026-01-03T17:54:50.955'}
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders correct number of market assets', () => {
        customRender(<MarketAssets marketAssets={mockMarketAssets} setSelectedAsset={mockSetSelectedAsset} />);

        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('calls setSelectedAsset with correct payload on click', async () => {
        customRender(<MarketAssets marketAssets={mockMarketAssets} setSelectedAsset={mockSetSelectedAsset} />);

        const buttons = screen.getAllByRole('button')
        await userEvent.click(buttons[0]);
        expect(mockSetSelectedAsset).toBeCalledWith({
            assetId: 1,
            symbol: 'BTC',
            name: 'Bitcoin',
            currentPrice: 5
        });
    });
});