import { describe, it, expect } from "vitest";
import { render, screen, within } from "../../tests/test-utils";
import RecentTransactionsTable from "./RecentTransactionsTable";
import userEvent from "@testing-library/user-event";

describe('RecentTransactionsTable Component', () => {
    const mockRecentTransactions = [
        {
            id: 1,
            name: 'Bitcoin',
            symbol: 'BTC',
            price: 5,
            quantity: 2,
            value: 10,
            type: 'BUY',
            disabled: false,
            createdAt: '2026-02-22T11:56:58.923427'
        },
        {
            id: 2,
            name: 'Ethereum',
            symbol: 'ETH',
            price: 10,
            quantity: 2,
            value: 20,
            type: 'SELL',
            disabled: false,
            createdAt: '2026-02-23T11:56:58.923427'
        },
    ];

    it('renders properly quantity of rows in recent transactions', () => {
        render(<RecentTransactionsTable recentTransactions={mockRecentTransactions} />);

        const table = screen.getByRole('table');
        const rows = within(table).getAllByRole('row');

        expect(rows).toHaveLength(3);
    });

    it('renders correct information in correct cell', () => {
        render(<RecentTransactionsTable recentTransactions={mockRecentTransactions} />);

        const table = screen.getByRole('table');
        const rows = within(table).getAllByRole('row');

        const headerRow = rows[0];
        const headerCells = within(headerRow).getAllByRole('columnheader');

        expect(headerCells[1]).toHaveTextContent(/asset name/i);

        const bodyRows = rows.slice(1);
        const firstRowBodyCells = within(bodyRows[0]).getAllByRole('cell');

        expect(firstRowBodyCells[0]).toHaveTextContent(new Date(mockRecentTransactions[1].createdAt).toLocaleDateString());
        expect(firstRowBodyCells[1]).toHaveTextContent(/ethereum/i); // because of sorted transactions by date
        expect(firstRowBodyCells[2]).toHaveTextContent(mockRecentTransactions[1].price);
        expect(firstRowBodyCells[3]).toHaveTextContent(mockRecentTransactions[1].quantity);
        expect(firstRowBodyCells[4]).toHaveTextContent(mockRecentTransactions[1].value);
        expect(firstRowBodyCells[5]).toHaveTextContent(mockRecentTransactions[1].type);
    });

    it('renders recent transaction correctly when a specific asset name is typed', async () => {
        render(<RecentTransactionsTable recentTransactions={mockRecentTransactions} />);

        const input = screen.getByRole('textbox', { name: /search assets/i });
        await userEvent.clear(input);
        await userEvent.type(input, "bIt");

        const table = screen.getByRole('table');
        const rows = within(table).findAllByRole('row');
        const bodyRows = (await rows).slice(1);
        const firstRowBodyCells = within(bodyRows[0]).getAllByRole('cell');

        expect(firstRowBodyCells[1]).toHaveTextContent(/bitcoin/i);
        expect(bodyRows).toHaveLength(1);
    });

    it('renders no data when wrong asset name is typed', async () => {
        render(<RecentTransactionsTable recentTransactions={mockRecentTransactions} />);

        const input = screen.getByRole('textbox', { name: /search assets/i });
        await userEvent.clear(input);
        await userEvent.type(input, "NonExistingAsset");

        const table = screen.getByRole('table');
        const rows = within(table).findAllByRole('row');
        const bodyRows = (await rows).slice(1);

        expect(bodyRows).toHaveLength(0);
    });

    it('renders recent trnasaction correctly when asset name in input is typed and then cleared', async () => {
        render(<RecentTransactionsTable recentTransactions={mockRecentTransactions} />);

        const input = screen.getByRole('textbox', { name: /search assets/i });
        await userEvent.clear(input);
        await userEvent.type(input, "BiT");

        let table = screen.getByRole('table');
        let rows = within(table).findAllByRole('row');
        let bodyRows = (await rows).slice(1);

        expect(bodyRows).toHaveLength(1);

        await userEvent.clear(input);
        table = screen.getByRole('table');
        rows = within(table).findAllByRole('row');
        bodyRows = (await rows).slice(1);

        expect(bodyRows).toHaveLength(2);
    });
});