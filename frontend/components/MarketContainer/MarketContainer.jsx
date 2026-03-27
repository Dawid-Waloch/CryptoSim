import MarketAssets from "../MarketAssets/MarketAssets";
import MarketBuyForm from "../MarketBuyForm/MarketBuyForm";
import PriceChart from "../PriceChart/PriceChart";
import {
    AssetsCard,
    AssetsChartCard,
    AssetsChartText,
    AssetsText,
    FormCard,
    FormText,
    MarketInfo,
    MarketWrapper
} from "./MarketContainerStyled";

const MarketContainer = (props) => {
    const {
        marketAssets,
        setSelectedAsset,
        assetInfo,
        assetPriceHistory,
        usdWallet
    } = props

    return (
        <MarketWrapper>
            <MarketInfo>
                <AssetsCard>
                    <AssetsText>Stocks & Assets:</AssetsText>
                    <MarketAssets marketAssets={marketAssets} setSelectedAsset={setSelectedAsset} />
                </AssetsCard>
                <AssetsChartCard>
                    <AssetsChartText>Price chart:</AssetsChartText>
                    <PriceChart assetInfo={assetInfo} assetPriceHistory={assetPriceHistory} />
                </AssetsChartCard>
                <FormCard>
                    <FormText>Buy form:</FormText>
                    <MarketBuyForm walletBalance={usdWallet.balance} assetInfo={assetInfo} />
                </FormCard>
            </MarketInfo>
        </MarketWrapper>
    );
}

export default MarketContainer;