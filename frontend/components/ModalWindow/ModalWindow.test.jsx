import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender, screen } from "../../tests/test-utils";
import ModalWindow from "./ModalWindow";

describe('ModalWindow Component', () => {
    const mockAssetInfo = {
        assetId: 4,
        currentPrice: 6,
        name: 'Shiba Inu',
        quantity: 1
    }
    const mockWallets = [{ currency: "USD", balance: 10 }];
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();
    const mockOpBuyType = "BUY";
    const mockOpSellType = "SELL";

    const mockRealHandleConfirm = (quantity, setFormError, opType) => {
        const qty = Number(quantity);
        const prize = mockAssetInfo.currentPrice * qty;
        const usdWallet = mockWallets.find(w => w.currency === "USD");

        if (qty <= 0) {
            setFormError("Quantity must be greater than 0");
            return;
        } else if (opType === "BUY" && prize > usdWallet.balance) {
            setFormError("Not enough funds");
            return;
        } else if (opType === "SELL" && qty > mockAssetInfo.quantity) {
            setFormError("Not enough assets");
            return;
        }
        setFormError("");
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it.each([
        { opType: 'BUY' },
        { opType: 'SELL' }
    ])('renders correct asset $opType modal', ({ opType }) => {
        customRender(<ModalWindow assetInfo={mockAssetInfo} operationType={opType} handleClose={handleClose} handleConfirm={handleConfirm} />);

        const OPERATION_LABEL = {
            BUY: "Buy",
            SELL: "Sell"
        };

        expect(screen.getByText(`${OPERATION_LABEL[opType]} ${mockAssetInfo.name} (${mockAssetInfo.currentPrice}$)`)).toBeInTheDocument();
    });

    it('closes ModalWindow properly', async () => {
        customRender(<ModalWindow assetInfo={mockAssetInfo} operationType={mockOpBuyType} handleClose={handleClose} handleConfirm={handleConfirm} />);

        await userEvent.click(screen.getByTestId('close-icon'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it.each([
        { opType: 'BUY' },
        { opType: 'SELL' }
    ])('confims ModalWindow $opType asset properly', async ({ opType }) => {
        customRender(<ModalWindow assetInfo={mockAssetInfo} operationType={opType} handleClose={handleClose} handleConfirm={handleConfirm} />);

        const input = screen.getByRole('spinbutton');
        const confirmButton = screen.getByRole('button', { name: /confirm/i });

        await userEvent.clear(input);
        await userEvent.type(input, '1');
        await userEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledTimes(1);
        expect(handleConfirm).toHaveBeenCalledWith(1, expect.any(Function));
    });

    it.each([
        { opType: 'BUY' },
        { opType: 'SELL' }
    ])('displays $opType quantity errors properly', async ({ opType }) => {
        customRender(
            <ModalWindow
                assetInfo={mockAssetInfo}
                operationType={opType}
                handleClose={handleClose}
                handleConfirm={(quantity, setFormError) =>
                    mockRealHandleConfirm(quantity, setFormError, opType)
                }
            />
        );

        const input = screen.getByRole('spinbutton');
        const confirmButton = screen.getByRole('button', { name: /confirm/i });

        await userEvent.clear(input);
        await userEvent.type(input, '0');
        await userEvent.click(confirmButton);

        const alertQuantity = await screen.findByRole('alert');
        expect(alertQuantity).toHaveTextContent(/quantity must be greater than 0/i);
    });

    it('redners funds errors properly', async () => {
        customRender(
            <ModalWindow
                assetInfo={mockAssetInfo}
                operationType={mockOpBuyType}
                handleClose={handleClose}
                handleConfirm={(quantity, setFormError) =>
                    mockRealHandleConfirm(quantity, setFormError, mockOpBuyType)
                }
            />
        );

        const input = screen.getByRole('spinbutton');
        const confirmButton = screen.getByRole('button', { name: /confirm/i });

        await userEvent.clear(input);
        await userEvent.type(input, '10000');
        await userEvent.click(confirmButton);

        const alertFunds = await screen.findByRole('alert');
        expect(alertFunds).toHaveTextContent(/not enough funds/i);
    });

    it('redners assets errors properly', async () => {
        customRender(
            <ModalWindow
                assetInfo={mockAssetInfo}
                operationType={mockOpSellType}
                handleClose={handleClose}
                handleConfirm={(quantity, setFormError) =>
                    mockRealHandleConfirm(quantity, setFormError, mockOpSellType)
                }
            />
        );

        const input = screen.getByRole('spinbutton');
        const confirmButton = screen.getByRole('button', { name: /confirm/i });

        await userEvent.clear(input);
        await userEvent.type(input, '10000');
        await userEvent.click(confirmButton);

        const alertAssets = await screen.findByRole('alert');
        expect(alertAssets).toHaveTextContent(/not enough assets/i);
    });
});