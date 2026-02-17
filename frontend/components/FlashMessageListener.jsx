import { useEffect } from "react";
import toast from "react-hot-toast";
import { useToast } from "../context/ToastContext";

const FlashMessageListener = () => {
    const { flashMessage, clearFlashMessage } = useToast();

    useEffect(() => {
        if(!flashMessage) return;

        if(flashMessage.type === "success") {
            toast.success(flashMessage.message, { duration: 4000 });
        } else {
            toast.error(flashMessage.message, { duration: 4000 });
        }
        
        clearFlashMessage();
    }, [flashMessage])

    return null;
}

export default FlashMessageListener;