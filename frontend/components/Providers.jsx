import { AssetProvider } from "../context/AssetContext";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>
                <AssetProvider>
                    {children}
                </AssetProvider>
            </ToastProvider>
        </AuthProvider>
    )
}

export default Providers;