import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute"
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { PersonIcon, EmailIcon, AccountBalanceWalletIcon } from "../../icons";
import {
    BoldSpan,
    Button,
    InfoSpan,
    ProfileContainer,
    SimulationBody,
    SimulationCard,
    SimulationText,
    UserInfoBody,
    UserInfoCard,
    UserInfoText
} from "./styles";

const Profile = () => {
    const [wallets, setWallets] = useState([]);
    const { setFlashMessage } = useToast();
    const { user, logout } = useAuth();
    const router = useRouter();

    const { username, userId, email } = user || {};

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
            <ProfileContainer>
                <UserInfoCard>
                    <UserInfoText>User Info:</UserInfoText>
                    <UserInfoBody>
                        <InfoSpan>
                            <PersonIcon />
                            <BoldSpan>Username:</BoldSpan>
                            <span>{username}</span>
                        </InfoSpan>
                        <InfoSpan>
                            <EmailIcon />
                            <BoldSpan>E-mail:</BoldSpan>
                            <span>{email}</span>
                        </InfoSpan>
                        <Button onClick={handleLogout}>Logout</Button>
                    </UserInfoBody>
                </UserInfoCard>
                <SimulationCard>
                    <SimulationText>Simulation:</SimulationText>
                    <SimulationBody>
                        <InfoSpan>
                            <AccountBalanceWalletIcon />
                            <BoldSpan>Balance:</BoldSpan>
                            <span>{Number(usdWallet.balance).toFixed(2)}$</span>
                        </InfoSpan>
                        <InfoSpan>
                            <AccountBalanceWalletIcon />
                            <BoldSpan>Start Balance:</BoldSpan>
                            <span>{Number(100).toFixed(2)}$</span>
                        </InfoSpan>
                        <Button onClick={resetSimulation}>Reset Simulation</Button>
                    </SimulationBody>
                </SimulationCard>
            </ProfileContainer>
        </ProtectedRoute>
    )
}

export default Profile;