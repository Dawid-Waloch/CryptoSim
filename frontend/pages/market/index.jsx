import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useToast } from "../../context/ToastContext";
import MarketAssets from "../../components/MarketAssets/MarketAssets";
import PriceChart from "../../components/PriceChart/PriceChart";
import MarketBuyForm from "../../components/MarketBuyForm/MarketBuyForm";
import { useAuth } from "../../context/AuthContext";
import {
    MarketContainer,
    MarketInfo,
    AssetsCard,
    AssetsText,
    AssetsChartCard,
    AssetsChartText,
    FormCard,
    FormText,
} from "./styles";

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
            <MarketContainer>
                <MarketInfo>
                    <AssetsCard>
                        <AssetsText>Stocks & Assets:</AssetsText>
                        <MarketAssets marketAssets={marketAssets} setSelectedAsset={setSelectedAsset} />
                    </AssetsCard>
                    <AssetsChartCard>
                        <AssetsChartText>Price chart:</AssetsChartText>
                        <PriceChart assetInfo={assetInfo} assetPriceHistory={assetPriceHistory} />
                    </AssetsChartCard>
                    <FormCard>
                        <FormText>Buy form:</FormText>
                        <MarketBuyForm walletBalance={usdWallet.balance} assetInfo={assetInfo} />
                    </FormCard>
                </MarketInfo>
            </MarketContainer>
        </ProtectedRoute>
    )
}

export default Market;