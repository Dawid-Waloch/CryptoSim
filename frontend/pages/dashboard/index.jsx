import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import WalletDropdown from "../../components/WalletDropdown";
import {
    BalanceCard,
    BalanceInfo,
    BalanceText,
    DasboardContainer,
    DashboardInfo,
    MarketOverviewCard,
    MarketOverviewText,
    PriceChartCard,
    PriceChartText,
    RecentTransactionsCard,
    RecentTransactionsText,
} from "./styles";

const Dashboard = () => {
    const [wallets, setWallets] = useState([]);
    const { user } = useAuth();
    const { setFlashMessage } = useToast();

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

                setWallets(data.wallets);
            } catch (err) {
                setFlashMessage({type: "error", message: err.message || "Server unreachable" });
            }
        }

        getBalance();
    }, [userId]);

    return (
        <ProtectedRoute>
            <Navbar />
            <DasboardContainer>
                <h2>Welcome, {username}!</h2>
                <DashboardInfo>
                    <BalanceCard>
                        <BalanceText>Account Balance:</BalanceText>
                        <BalanceInfo>
                            {wallets.length > 0 ? (
                                <WalletDropdown wallets={wallets} />
                            ) : (
                                <div>You don't have any wallet</div>
                            )}
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