import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event';
import { customRender, getByText, screen } from "../../tests/test-utils";
import MarketBuyForm from './MarketBuyForm';

describe('MarketBuyForm Component', () => {
    const mockWalletBalance = 100;
    const mockAssetInfo = {
        assetId: 1,
        currentPrice: 6,
        name: "Shiba Inu",
        symbol: "SHIB"
    };
    // const mockSetFlashMessage = vi.fn();

    it('renders correct buy form', () => {
        customRender(<MarketBuyForm walletBalance={mockWalletBalance} assetInfo={mockAssetInfo} />);

        expect(screen.getByText(/shiba inu/i)).toBeInTheDocument();
    });

    it('button decrements quantity but never below 0', async () => {
        customRender(<MarketBuyForm walletBalance={mockWalletBalance} assetInfo={mockAssetInfo} />);

        const DecrementButton = screen.getByRole('button', { name: '-' });
        const input = screen.getByRole('spinbutton');

        expect(input).toHaveValue(0);
        await userEvent.click(DecrementButton);
        expect(input).toHaveValue(0);
    });

    it('button increments quantity', async () => {
        customRender(<MarketBuyForm walletBalance={mockWalletBalance} assetInfo={mockAssetInfo} />);

        const IncrementButton = screen.getByRole('button', { name: '+' });
        const input = screen.getByRole('spinbutton');

        expect(input).toHaveValue(0);
        await userEvent.click(IncrementButton);
        expect(input).toHaveValue(1);
    });

    it('renders correct wallet balance', () => {
        customRender(<MarketBuyForm walletBalance={mockWalletBalance} assetInfo={mockAssetInfo} />);

        expect(screen.getByText(new RegExp(`Total Cash: ${mockWalletBalance.toFixed(2)}\\$`, 'i'))).toBeInTheDocument();
    });

    it('shows error when the walletBalance is too low', async () => {
        customRender(<MarketBuyForm walletBalance={mockWalletBalance} assetInfo={mockAssetInfo} />);

        const buyButton = screen.getByRole('button', { name: /buy/i });
        const input = screen.getByRole('spinbutton');

        await userEvent.type(input, '500');
        await userEvent.click(buyButton);

        expect(screen.getByText(/you don't have enough money to buy that asset/i)).toBeInTheDocument();
    });

    // it('submits purchase successfully', async () => {
    //     customRender(<MarketBuyForm walletBalance={mockWalletBalance} assetInfo={mockAssetInfo} />);

    //     fetch.mockResolvedValueOnce({
    //         ok: true,
    //         text: async () => /asset bought successfully/i
    //     });

    //     const buyButton = screen.getByRole('button', { name: /buy/i });
    //     const input = screen.getByRole('spinbutton');

    //     await userEvent.clear(input);
    //     await userEvent.type(input, '1');
    //     await userEvent.click(buyButton);

    //     expect(mockSetFlashMessage).toHaveBeenCalledWith({
    //         type: 'success',
    //         message: /asset bought successfully/i
    //     });
    // });
});