import { describe, it, expect } from "vitest";
import { render, screen, within } from "../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import WalletDropdown from "./WalletDropdown";

describe('WalletDropdown Component', () => {
    const mockWallets = [
        { id: 13, balance: 100, currency: 'USD', lockedBalance: 0, isActive: true },
        { id: 14, balance: 50, currency: 'PLN', lockedBalance: 0, isActive: true },
    ];

    it('displays wallets', async () => {
        render(<WalletDropdown wallets={mockWallets} />);

        const selectButton = screen.getByRole('combobox');
        await userEvent.click(selectButton);

        const listbox = await screen.findByRole('listbox');
        const options = within(listbox).getAllByRole('option');

        expect(options).toHaveLength(2);

        expect(options[0]).toHaveTextContent(/100/i);
        expect(options[0]).toHaveTextContent(/usd/i);

        expect(options[1]).toHaveTextContent(/50/i);
        expect(options[1]).toHaveTextContent(/pln/i);
    });
});