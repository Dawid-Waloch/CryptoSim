import { render } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import { AssetProvider } from "../context/AssetContext";

const AllProviders = ({ children }) => {
    return (
        <AuthProvider>
                <ToastProvider>
                    <AssetProvider>
                        {children}
                    </AssetProvider>
                </ToastProvider>
        </AuthProvider>
    );
};

export const customRender = (ui, options) =>
    render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";