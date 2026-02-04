import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import {
    Button,
    BuyButton,
    EstimatedCostField,
    Input,
    MarketBuyFormBody,
    MarketBuyFormContainer,
    MarketBuyFormHeader,
    PricePerAssetField,
    QuantityControl,
    QuantityField,
    TotalCashField
} from "./MarketBuyFormStyled";

const MarketBuyForm = ({ walletBalance, assetInfo }) => {
    const [quantity, setQuantity] = useState(undefined);
    const { setFlashMessage } = useToast();
    const { user } = useAuth();
    const router = useRouter();

    const {
        assetId,
        symbol,
        name,
        currentPrice
    } = assetInfo || {};

    const {
        userId
    } = user || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/transactions/buy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    assetId,
                    quantity
                })
            })

            if(!response.ok) {
                throw new Error("We couldn't buy this asset");
            }

            const data = await response.text();
            setFlashMessage({ type: "success", message: data });
            router.reload();
        } catch (err) {
            setFlashMessage({ type: "error", message: err.message || "Server unreachable" });
        }
    }

    return (
        <MarketBuyFormContainer>
            <MarketBuyFormHeader>
                <span>Buy {name} Asset</span>
                <span>{String(symbol).toUpperCase()}</span>
            </MarketBuyFormHeader>
            <MarketBuyFormBody>
                <form onSubmit={handleSubmit}>
                    <QuantityField>
                        <span>Quantity</span>
                        <QuantityControl>
                            <Button
                                type="button"
                                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                            >
                                -
                            </Button>
                            <Input
                                type="number"
                                min={0}
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setQuantity(value === "" ? "" : Number(value))
                                }}
                            />
                            <Button
                                type="button"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </Button>
                        </QuantityControl>
                    </QuantityField>
                    <PricePerAssetField>
                        <span>Price per Asset</span>
                        <span>{currentPrice}$</span>
                    </PricePerAssetField>
                    <EstimatedCostField>
                        <span>Estimated cost</span>
                        <span>{((quantity || 0) * currentPrice).toFixed(2)}$</span>
                    </EstimatedCostField>
                    <TotalCashField>
                        <span>Total Cash: {Number(walletBalance).toFixed(2)}$</span>
                    </TotalCashField>
                    <BuyButton type="submit">Buy</BuyButton>
                </form>
            </MarketBuyFormBody>
        </MarketBuyFormContainer>
    )
}

export default MarketBuyForm;