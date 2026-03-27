import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import MarketContainer from "../../components/MarketContainer/MarketContainer";

const Market = () => {
    const [marketAssets, setMarketAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState({});
    const [assetPriceHistory, setAssetPriceHistory] = useState([]);
    const [wallets, setWallets] = useState([]);
    const { setFlashMessage } = useToast();
    const { user } = useAuth();

    const { userId } = user || {};

    useEffect(() => {
        if(!userId) return;

        const getMarketAssets = async () => {
            try {
                // TODO
                // Local server
                const response = await fetch("http://localhost:8080/assets", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if(!response.ok) {
                    throw new Error("We couldn't get market assets data");
                }

                const data = await response.json();
                setMarketAssets(data);
            } catch (err) {
                setFlashMessage({ type: "error", message: err.message || "Server unreachable" });
            }
        }

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

        getMarketAssets();
        getBalance();
    }, [userId])

    useEffect(() => {
        const getHistoricalDataByAssetId = async () => {
            try {
                // TODO
                // Local server
                const response = await fetch(`http://localhost:8080/assets/${selectedAsset.assetId || 1}/candles`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if(!response.ok) {
                    throw new Error("We couldn't get data about the asset");
                }

                const data = await response.json();
                
                setAssetPriceHistory(data);
            } catch (err) {
                setFlashMessage({ type: "error", message: err.message || "Server unreachable" });
            }
            
        };

        getHistoricalDataByAssetId();
    }, [selectedAsset])

    const assetInfo = {
        assetId: selectedAsset.assetId || marketAssets[0]?.id,
        symbol: selectedAsset.symbol || marketAssets[0]?.symbol,
        name: selectedAsset.name || marketAssets[0]?.name,
        currentPrice: selectedAsset.currentPrice || marketAssets[0]?.currentPrice
    };

    const usdWallet = wallets.find(wallet => wallet.currency === "USD") || {};

    return (
        <ProtectedRoute>
            <Navbar />
            <MarketContainer
                marketAssets={marketAssets}
                setSelectedAsset={setSelectedAsset}
                assetInfo={assetInfo}
                assetPriceHistory={assetPriceHistory}
                usdWallet={usdWallet}
            />
        </ProtectedRoute>
    )
}

export default Market;