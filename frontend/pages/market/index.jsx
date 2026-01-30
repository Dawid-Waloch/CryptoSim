import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useToast } from "../../context/ToastContext";
import MarketAssets from "../../components/MarketAssets/MarketAssets";
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
    const { setFlashMessage } = useToast();

    useEffect(() => {
        const getMarketAssets = async () => {
            try {
                // TODO
                // Json server
                const response = await fetch("http://localhost:5000/assetsList", {
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

        getMarketAssets();
    }, [])

    return (
        <ProtectedRoute>
            <Navbar />
            <MarketContainer>
                <MarketInfo>
                    <AssetsCard>
                        <AssetsText>Stocks & Assets:</AssetsText>
                        <MarketAssets marketAssets={marketAssets} />
                    </AssetsCard>
                    <AssetsChartCard>
                        <AssetsChartText>Price chart:</AssetsChartText>
                        <div>coś 2</div>
                    </AssetsChartCard>
                    <FormCard>
                        <FormText>Buy form:</FormText>
                        <div>coś 3</div>
                    </FormCard>
                </MarketInfo>
            </MarketContainer>
        </ProtectedRoute>
    )
}

export default Market;