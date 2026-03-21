import { describe, expect, it } from "vitest";
import { render, screen } from "../../tests/test-utils";
import EmptyTable from "./EmptyTable";

describe('EmptyTable Component', () => {
    const mockCells = ["date", "value", "quantity"];
    const mockMessage = "You don't have any data";

    it('renders correct cells', () => {
        render(<EmptyTable cells={mockCells} message={mockMessage} />);

        expect(screen.getByText("date")).toBeInTheDocument();
        expect(screen.getByText("value")).toBeInTheDocument();
        expect(screen.getByText("quantity")).toBeInTheDocument();
    });

    it('renders correct message', () => {
        render(<EmptyTable cells={mockCells} message={mockMessage} />);

        expect(screen.getByText("You don't have any data")).toBeInTheDocument();
    });
});