import { afterEach, describe, expect, it, vi } from "vitest";
import toast from "react-hot-toast";
import { customRender, screen, waitFor } from "../../tests/test-utils";
import { useToast } from "../../context/ToastContext";
import FlashMessageListener from "./FlashMessageListener";

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock('../../context/ToastContext', async (importOriginal) => {
    const actual = await importOriginal();

    return {
        ...actual,
        useToast: vi.fn(),
    };
});

describe('FlashMessageListener Component', () => {
    const mockClearFlashMessage = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('shows success toast and clears flash message', async () => {
        vi.mocked(useToast).mockReturnValue({
            flashMessage: { type: 'success', message: 'Saved!' },
            clearFlashMessage: mockClearFlashMessage,
        });

        customRender(<FlashMessageListener />);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Saved!', { duration: 4000 });
        });

        expect(mockClearFlashMessage).toHaveBeenCalled();
    });

    it('shows error toast and clears flash message', async () => {
        vi.mocked(useToast).mockReturnValue({
            flashMessage: { type: 'error', message: 'Error!' },
            clearFlashMessage: mockClearFlashMessage,
        });

        customRender(<FlashMessageListener />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error!', { duration: 4000 });
        });

        expect(mockClearFlashMessage).toHaveBeenCalled();
    });

    it('does nothing when flash message is null', async () => {
        vi.mocked(useToast).mockReturnValue({
            flashMessage: null,
            clearFlashMessage: mockClearFlashMessage,
        });

        customRender(<FlashMessageListener />);

        expect(toast.error).not.toHaveBeenCalled();
        expect(toast.success).not.toHaveBeenCalled();
        expect(mockClearFlashMessage).not.toHaveBeenCalled();
    });
});