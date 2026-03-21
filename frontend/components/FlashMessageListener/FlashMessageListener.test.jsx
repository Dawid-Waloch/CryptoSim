import { afterEach, describe, expect, it, vi } from "vitest";
import toast from "react-hot-toast";
import { render, waitFor } from "../../tests/test-utils";
import { useToast } from "../../context/ToastContext";
import FlashMessageListener from "./FlashMessageListener";

describe('FlashMessageListener Component', () => {
    const mockClearFlashMessage = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('shows success toast and clears flash message', async () => {
        vi.mocked(useToast).mockReturnValueOnce({
            flashMessage: { type: 'success', message: 'Saved!' },
            clearFlashMessage: mockClearFlashMessage,
        });

        render(<FlashMessageListener />);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Saved!', { duration: 4000 });
        });

        expect(mockClearFlashMessage).toHaveBeenCalled();
    });

    it('shows error toast and clears flash message', async () => {
        vi.mocked(useToast).mockReturnValueOnce({
            flashMessage: { type: 'error', message: 'Error!' },
            clearFlashMessage: mockClearFlashMessage,
        });

        render(<FlashMessageListener />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error!', { duration: 4000 });
        });

        expect(mockClearFlashMessage).toHaveBeenCalled();
    });

    it('does nothing when flash message is null', async () => {
        vi.mocked(useToast).mockReturnValueOnce({
            flashMessage: null,
            clearFlashMessage: mockClearFlashMessage,
        });

        render(<FlashMessageListener />);

        expect(toast.error).not.toHaveBeenCalled();
        expect(toast.success).not.toHaveBeenCalled();
        expect(mockClearFlashMessage).not.toHaveBeenCalled();
    });
});