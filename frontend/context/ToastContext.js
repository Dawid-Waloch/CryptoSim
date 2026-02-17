import { createContext, useContext, useState } from "react"

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [flashMessage, setFlashMessage] = useState("");

    const clearFlashMessage = () => setFlashMessage("");

    return (
        <ToastContext.Provider value={{ flashMessage, setFlashMessage, clearFlashMessage }}>
            {children}
        </ToastContext.Provider>
    )
};

export const useToast = () => useContext(ToastContext);

