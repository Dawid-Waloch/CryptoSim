import { useState } from "react";
import {
    AssetInfo,
    Button,
    CancelContainer,
    CostInfoSpan,
    Icon,
    Input,
    ModalContainer,
    OverlayContainer,
    ErrorContainer
} from "./ModalWindowStyled"

const ModalWindow = ({ handleClose, assetInfo, operationType, handleConfirm }) => {
    const [quantityOfAsset, setQuantityOfAsset] = useState(null);
    const [formError, setFormError] = useState("");

    const OPERATION_LABEL = {
        BUY: "Buy",
        SELL: "Sell"
    };

    const label = operationType === "BUY" ? "Cost" : "Income";

    return (
        <OverlayContainer>
            <ModalContainer>
                <CancelContainer>
                    <Icon onClick={handleClose} />
                </CancelContainer>
                <AssetInfo>{OPERATION_LABEL[operationType]} {assetInfo.name} ({assetInfo.currentPrice}$)</AssetInfo>
                <Input
                    type="number"
                    placeholder="Quantity"
                    name="Quantity"
                    value={quantityOfAsset}
                    onChange={(e) => setQuantityOfAsset(e.target.value)}
                />
                <ErrorContainer>{formError}</ErrorContainer>
                <CostInfoSpan>
                    {label}: {assetInfo.currentPrice * quantityOfAsset}$
                </CostInfoSpan>
                <Button onClick={() => handleConfirm(quantityOfAsset, setFormError)}>Confirm</Button>
            </ModalContainer>
        </OverlayContainer>
    );
}

export default ModalWindow;