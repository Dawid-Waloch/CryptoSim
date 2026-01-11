import { AssetInfo, Button, CancelContainer, Icon, Input, ModalContainer, OverlayContainer } from "./ModalWindowStyled"

const ModalWindow = ({ handleClose, assetName, operationType }) => {
    const OPERATION_LABEL = {
        BUY: "Buy",
        SELL: "Sell"
    };

    return (
        <OverlayContainer>
            <ModalContainer>
                <CancelContainer>
                    <Icon onClick={handleClose} />
                </CancelContainer>
                <AssetInfo>{OPERATION_LABEL[operationType]} {assetName}</AssetInfo>
                <Input type="number" placeholder="Amount" />
                <Button>Confirm</Button>
            </ModalContainer>
        </OverlayContainer>
    );
}

export default ModalWindow;