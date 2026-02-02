import styled from "styled-components";

export const MarketContainer = styled.div`
    width: 80%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
`;

export const MarketInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
    gap: 20px;
`;

export const AssetsCard = styled.div`
    border: 1px solid white;
    border-radius: 12px;
    grid-column: 1;
    grid-row: 1 / span 3;
`;

export const AssetsText = styled.div`
    background: #3a0000;
    border-radius: 12px 12px 0 0;
    padding: 10px;
    font-weight: bold;
`;

export const AssetsChartCard = styled(AssetsCard)`
    grid-column: 2;
    grid-row: 1 / span 2;
`;

export const FormCard = styled(AssetsCard)`
    grid-column: 2;
    grid-row: 3;
`;

export const AssetsChartText = styled(AssetsText)``;

export const FormText = styled(AssetsText)``
