import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    if (user === undefined) {
        return null;
    }

    if (user === null) {
        router.replace("/login");
        return null;
    }

    return children;
}

export default ProtectedRoute;