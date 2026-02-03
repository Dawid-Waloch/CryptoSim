import { useState } from "react";
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

const MarketBuyForm = () => {
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Buy assets in market");
    }

    return (
        <MarketBuyFormContainer>
            <MarketBuyFormHeader>
                <span>Buy Bitcoin Asset</span>
                <span>BTC</span>
            </MarketBuyFormHeader>
            <MarketBuyFormBody>
                <form onSubmit={handleSubmit}>
                    <QuantityField>
                        <span>Quantity</span>
                        <QuantityControl>
                            <Button onClick={() => setQuantity((q) => Math.max(0, q - 1))}>-</Button>
                            <Input
                                type="number"
                                min={0}
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                            <Button onClick={() => setQuantity((q) => q + 1)}>+</Button>
                        </QuantityControl>
                    </QuantityField>
                    <PricePerAssetField>
                        <span>Price per Asset</span>
                        <span>$coś</span>
                    </PricePerAssetField>
                    <EstimatedCostField>
                        <span>Estimated cost</span>
                        <span>$coś 2</span>
                    </EstimatedCostField>
                    <TotalCashField>
                        <span>Total Cash: $coś3 </span>
                    </TotalCashField>
                    <BuyButton type="submit">Buy</BuyButton>
                </form>
            </MarketBuyFormBody>
        </MarketBuyFormContainer>
    )
}

export default MarketBuyForm;