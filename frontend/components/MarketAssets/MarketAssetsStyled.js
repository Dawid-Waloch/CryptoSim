import styled from "styled-components";

export const AssetsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 700px;
    overflow-y: auto;
`;

export const MarketAssetContainer = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid white;
`;

export const MarketAssetInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
`

export const MarketAssetName = styled.span`
    font-size: 1rem;
    font-weight: bold;
`;

export const MarketPrice = styled.span`
    font-weight: bold;
    text-align: right;
`;

export const MarketPricePercentage = styled.span`
    text-align: right;
`

export const MarketAssetNameContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MarketPriceInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ChangeSpan = styled.span`
    display: flex;
    align-items: center;
    color: ${(props) => (props.profit ? "green" : "red")};
    font-weight: bold;
`;

export const Image = styled.img`
    width: 45px;
    height: 45px;
`;