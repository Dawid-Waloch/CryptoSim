import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.replace("/login");
        }
    }, [user, router]);

    if (user === undefined) {
        return null;
    }

    if (user === null) {
        return null;
    }

    return children;
}

export default ProtectedRoute;