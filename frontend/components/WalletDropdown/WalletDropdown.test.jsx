import { describe, it, expect } from "vitest";
import { render, screen } from "../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import WalletDropdown from "./WalletDropdown";

describe('WalletDropdown Component', () => {
    const mockWallets = [{
        id: 13,
        balance: 100,
        currency: 'USD',
        lockedBalance: 0,
        isActive: true
    }];

    it('displays usd wallet', async () => {
        render(<WalletDropdown wallets={mockWallets} />);

        const selectButton = screen.getByRole('button');
        await userEvent.click(selectButton);

        expect(await screen.findByText(/100/i)).toBeInTheDocument();
        expect(await screen.findByText(/usd/i)).toBeInTheDocument();
    });
});