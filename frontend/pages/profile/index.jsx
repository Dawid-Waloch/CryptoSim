import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute"
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";

const Profile = () => {
    const [wallets, setWallets] = useState([]);
    const { setFlashMessage } = useToast();
    const { user, logout } = useAuth();
    const router = useRouter();

    const { userId } = user || {};

    useEffect(() => {
        if(!userId) return;

        const getBalance = async () => {
            try {
                // TODO
                // Local server
                const response = await fetch(`http://localhost:8080/wallets/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId
                    })
                })

                if(!response.ok) {
                    throw new Error("We couldn't get your wallet balance");
                }

                const data = await response.json();

                setWallets(data.wallets);
            } catch (err) {
                setFlashMessage({ type: "error", message: err.message || "Server unreachable" });
            }
        }

        getBalance();
    }, [userId]);

    const resetSimulation = async () => {
        try {
            // TODO
            // Local server
            const response = await fetch(`http://localhost:8080/reset?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!response.ok) {
                throw new Error("We couldn't reset simulation");
            }

            const data = await response.text();
            setFlashMessage({ type: "success", message: data });
            router.push("/dashboard");
        } catch (err) {
            setFlashMessage({ type: "error", message: err.message || "Server unreachable" });
        }
    }

    const handleLogout = () => {
        logout();
        setFlashMessage({type: "success", message: "Logout success"});
    }

    const usdWallet = wallets.find(wallet => wallet.currency === "USD") || {};

    return (
        <ProtectedRoute>
            <Navbar />
            <ProfileContainer
                handleLogout={handleLogout}
                usdWallet={usdWallet}
                resetSimulation={resetSimulation}
            />
        </ProtectedRoute>
    )
}

export default Profile;