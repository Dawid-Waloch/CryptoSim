import styled from "styled-components";

export const AssetTitleChart = styled.div`
    display: flex;
    align-items: center;
`

export const AssetChartContainer = styled.div`
    margin: 10px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`

export const AssetInfoChart = styled.div`
    display: flex;
    flex-direction: column;
`

export const AssetName = styled.span`
    font-size: 19px;
    font-weight: bold;
`

export const AssetPriceContainer = styled.div`
    display: flex;
`

export const ChangeSpan = styled.span`
    display: flex;
    align-items: center;
    color: ${(props) => (props.profit ? "green" : "red")};
    font-weight: bold;
`;

export const PercentageChangeSpan = styled.span`
    margin-left: 5px;
`

export const ChartContainer = styled.div`
    width: 100%;
    max-width: 100%;
    height: 250px;
    margin-top: 20px;
    border-radius: 12px;
    overflow: hidden;
`

export const AssetPrice = styled(AssetName)``;