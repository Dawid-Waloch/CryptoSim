import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    )
}

export default Providers;