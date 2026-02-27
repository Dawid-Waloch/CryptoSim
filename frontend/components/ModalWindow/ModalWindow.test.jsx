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
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();

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

    const mockOpType = "BUY";

    it('closes ModalWindow properly', async () => {
        customRender(<ModalWindow assetInfo={mockAssetInfo} operationType={mockOpType} handleClose={handleClose} handleConfirm={handleConfirm} />);

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
        expect(handleConfirm).toHaveBeenCalledWith('1', expect.any(Function));
    });
});