import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import WalletDropdown from "../../components/WalletDropdown";
import AssetsTable from "../../components/AssetsTable/AssetsTable";
import RecentTransactionsTable from "../../components/RecentTransactionsTable/RecentTransactionsTable";
import EmptyTable from "../../components/EmptyTable/EmptyTable";
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
import PriceChart from "../../components/PriceChart/PriceChart";
import { useAsset } from "../../context/AssetContext";

const Dashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [assetsWallet, setAssetsWallet] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [assetPriceHistory, setAssetPriceHistory] = useState([]);
    const { user } = useAuth();
    const { setFlashMessage } = useToast();
    const { selectedAsset } = useAsset();

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
           
                if(!response.ok) {
                    throw new Error("We couldn't get a balance from api");
                }

                const data = await response.json();

                if(data.success === false) {
                    throw new Error("We couldn't get a balance from api");
                }
                
                setWallets(data.wallets);
            } catch (err) {
                setFlashMessage({type: "error", message: err.message || "Server unreachable" });
            }
        }

        const getWalletAssets = async () => {
            try {
                // TODO
                // Local server
                const response = await fetch(`http://localhost:8080/portfolio?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(!response.ok) {
                    throw new Error("We couldn't get your bought assets");
                }

                const data = await response.json();

                setAssetsWallet(data);
            } catch (err) {
                setFlashMessage({type: "error", message: err.message || "Server unreachable" });
            }
        }

        const getRecentTransactions = async () => {
            try {
                // TODO
                // Local server
                const response = await fetch(`http://localhost:8080/transactions?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if(!response.ok) {
                    throw new Error("We couldn't get your recent transactions");
                }

                const data = await response.json();

                setRecentTransactions(data);
            } catch (err) {
                setFlashMessage({type: "error", message: err.message || "Server unreachable" });
            }
        }

        getBalance();
        getWalletAssets();
        getRecentTransactions();
    }, [userId]);

    useEffect(() => {
        const getAssetHistory = async () => {
            try {
                // TODO
                // Local server
                const response = await fetch(`http://localhost:8080/assets/${selectedAsset || 1}/candles`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if(!response.ok) {
                    throw new Error("We couldn't get your asset's price history");
                }
                
                const data = await response.json();

                setAssetPriceHistory(data);
            } catch (err) {
                setFlashMessage({type: "error", message: err.message || "Server unreachable" });
            }
        }

        getAssetHistory();
    }, [selectedAsset])

    const priceHistoryAssetId = selectedAsset || 1;
    const assetInfo = assetsWallet.find(a => a.assetId === priceHistoryAssetId) || {name: "Bitcoin", symbol: "BTC"};

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
                        <PriceChart
                            assetInfo={assetInfo}
                            assetPriceHistory={assetPriceHistory}
                        />
                    </PriceChartCard>
                    <MarketOverviewCard>
                        <MarketOverviewText>Market Overview:</MarketOverviewText>
                        {assetsWallet.length > 0 ? (
                            <AssetsTable assetsWallet={assetsWallet} wallets={wallets} />
                        ) : (
                            <EmptyTable
                                cells={["Asset", "Quantity", "Current Price", "Value", "Buy", "Sell"]}
                                message={"You don't have any bought assets"}
                            />
                        )}
                    </MarketOverviewCard>
                    <RecentTransactionsCard>
                        <RecentTransactionsText>Recent Transactions:</RecentTransactionsText>
                        {recentTransactions.length > 0 ? (
                            <RecentTransactionsTable recentTransactions={recentTransactions} />
                        ) : (
                            <EmptyTable
                                cells={["Date", "Asset Name", "Price", "Quantity", "Value", "Type"]}
                                message={"You don't have any transactions"}
                            />
                        )}
                    </RecentTransactionsCard>
                </DashboardInfo>
            </DasboardContainer>
        </ProtectedRoute>
    );
};

export default Dashboard;