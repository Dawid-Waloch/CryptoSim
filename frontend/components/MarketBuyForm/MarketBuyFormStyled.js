import styled from "styled-components";
import { Input as BaseInput } from "../RecentTransactionsTable/RecentTransactionsStyled";
import { Button as BaseButton } from "../ModalWindow/ModalWindowStyled";

export const MarketBuyFormContainer = styled.div`
    margin: 10px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

export const MarketBuyFormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 5px;
`;

export const MarketBuyFormBody = styled.div`
    background-color: rgba(0, 0, 0, 0.33);
    margin-top: 10px; 
    border-radius: 12px;
    padding: 10px;
`;

export const QuantityField = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const QuantityControl = styled.div`
    display: flex;
    align-items: center;
`
export const PricePerAssetField = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const EstimatedCostField = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const TotalCashField = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid white;
    border-radius: 12px;
    padding: 15px;
    margin-top: 10px;
`;

export const Input = styled(BaseInput)`
    margin: 0 3px;
    font-size: 12px;
    padding: 10px;
`;

export const Button = styled(BaseButton)`
    width: 35px;
    padding: 9px;
    margin: 0;
`;

export const BuyButton = styled(BaseButton)``;