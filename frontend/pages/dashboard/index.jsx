import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import {
    BalanceCard,
    BalanceInfo,
    BalanceText,
    BalanceValue,
    DasboardContainer,
    DashboardInfo,
    MarketOverviewCard,
    MarketOverviewText,
    PriceChartCard,
    PriceChartText,
    RecentTransactionsCard,
    RecentTransactionsText,
    WalletIcon
} from "./styles";

const Dashboard = () => {
    const [error, setError] = useState("");
    const [wallets, setWallets] = useState([]);
    const { user, logout } = useAuth();

    const { username, userId } = user || {};

    useEffect(() => {
        if(!userId) return;

        const getBalance = async () => {
            try {
                // TODO
                // Local server
                const response = await fetch(`http://localhost:8080/wallets/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId
                    }),
                })

                const data = await response.json();

                if(!response.ok || data.success === false) {
                    throw new Error("We couldn't get a balance from api");
                }

                setWallets(data);
            } catch (err) {
                setError([{id: "network", error: err.message || "Server unreachable" }]);
            }
        }

        getBalance();
    }, [userId]);

    return (
        <ProtectedRoute>
            <Navbar />
            <DasboardContainer>
                <h2>Welcome, {username}!</h2>
                <button onClick={logout}>Logout</button>
                <DashboardInfo>
                    <BalanceCard>
                        <BalanceText>Account Balance:</BalanceText>
                        <BalanceInfo>
                            {/* <BalanceValue>${wallets.wallets[0].balance}</BalanceValue> */}
                            <WalletIcon fontSize="large" />
                        </BalanceInfo>
                    </BalanceCard>
                    <PriceChartCard>
                        <PriceChartText>Price chart:</PriceChartText>
                    </PriceChartCard>
                    <MarketOverviewCard>
                        <MarketOverviewText>Market Overview:</MarketOverviewText>
                        <div>cos</div>
                    </MarketOverviewCard>
                    <RecentTransactionsCard>
                        <RecentTransactionsText>Recent Transactions:</RecentTransactionsText>
                        <div>cos2</div>
                    </RecentTransactionsCard>
                </DashboardInfo>
            </DasboardContainer>
        </ProtectedRoute>
    );
};

export default Dashboard;