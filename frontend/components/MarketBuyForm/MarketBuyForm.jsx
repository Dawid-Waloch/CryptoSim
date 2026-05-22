import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import {
    Button,
    BuyButton,
    ErrorContainer,
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
    const [quantity, setQuantity] = useState(0);
    const [formError, setFormError] = useState("");
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

        if(quantity * currentPrice > walletBalance) {
            setFormError("You don't have enough money to buy that asset");
            return;
        }

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
            setTimeout(() => {
                router.reload();
            }, 500);
        } catch (err) {
            setFlashMessage({ type: "error", message: err.message || "Server unreachable" });
        }
    }

    return (
        <MarketBuyFormContainer>
            <MarketBuyFormHeader>
                <span data-testid="market-asset-name-buy-span">Buy {name} Asset</span>
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
                                data-testid="market-quantity-input"
                                type="number"
                                min={0}
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setQuantity(Number(value))
                                }}
                            />
                            <Button
                                type="button"
                                onClick={() => setQuantity((q) => (Number(q) || 0) + 1)}
                            >
                                +
                            </Button>
                        </QuantityControl>
                    </QuantityField>
                    <PricePerAssetField>
                        <span>Price per Asset</span>
                        <span>{Number(currentPrice).toFixed(2)}$</span>
                    </PricePerAssetField>
                    <EstimatedCostField>
                        <span>Estimated cost</span>
                        <span>{((quantity || 0) * currentPrice).toFixed(2)}$</span>
                    </EstimatedCostField>
                    <TotalCashField>
                        <span data-testid="market-total-cash-span">Total Cash: {Number(walletBalance).toFixed(2)}$</span>
                    </TotalCashField>
                    <BuyButton data-testid="market-buy-btn" type="submit">Buy</BuyButton>
                    <ErrorContainer>{formError}</ErrorContainer>
                </form>
            </MarketBuyFormBody>
        </MarketBuyFormContainer>
    )
}

export default MarketBuyForm;