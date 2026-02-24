import { describe, expect, it } from "vitest";
import { customRender, screen } from "../../tests/test-utils";
import EmptyTable from "./EmptyTable";

describe('EmptyTable Component', () => {
    const mockCells = ["date", "value", "quantity"];
    const mockMessage = "You don't have any data";

    it('renders correct cells', () => {
        customRender(<EmptyTable cells={mockCells} message={mockMessage} />);

        expect(screen.getByText("date")).toBeInTheDocument();
        expect(screen.getByText("value")).toBeInTheDocument();
        expect(screen.getByText("quantity")).toBeInTheDocument();
    });

    it('renders correct message', () => {
        customRender(<EmptyTable cells={mockCells} message={mockMessage} />);

        expect(screen.getByText("You don't have any data")).toBeInTheDocument();
    });
});