import { ArrowDropUpIcon, ArrowDropDownIcon } from '../../icons';
import { TokenIcon } from '@web3icons/react/dynamic'
import {
    AssetsListContainer,
    ChangeSpan,
    MarketAssetContainer,
    MarketAssetInfo,
    MarketAssetName,
    MarketAssetNameContainer,
    MarketPrice,
    MarketPriceInfo,
} from "./MarketAssetsStyled";

const MarketAssets = ({ marketAssets, setSelectedAsset }) => {
    return (
        <AssetsListContainer>
            {marketAssets.map((marketAsset, id) => (
                <MarketAssetContainer
                    $id={id}
                    key={id}
                    onClick={() => setSelectedAsset({
                        assetId: marketAsset.id,
                        symbol: marketAsset.symbol,
                        name: marketAsset.name,
                        currentPrice: marketAsset.currentPrice
                    })}
                >
                    <MarketAssetInfo>
                        <TokenIcon symbol={marketAsset.symbol} variant="branded" size={50} />
                        <MarketAssetNameContainer>
                            <MarketAssetName>{marketAsset.name}</MarketAssetName>
                            <span>{String(marketAsset.symbol).toUpperCase()}</span>
                        </MarketAssetNameContainer>
                    </MarketAssetInfo>
                    <MarketPriceInfo>
                        <MarketPrice>{Number(marketAsset.currentPrice).toFixed(2)}$</MarketPrice>
                        {/* // TODO
                        // To fix */}
                        {/* {marketAsset.price_change_percentage_24h >= 0 ? (
                            <ChangeSpan profit={true}>
                                <ArrowDropUpIcon />
                                <span>+{Number(marketAsset.price_change_percentage_24h).toFixed(2)}</span>
                            </ChangeSpan>
                        ) : (
                            <ChangeSpan>
                                <ArrowDropDownIcon />
                                <span>{Number(marketAsset.price_change_percentage_24h).toFixed(2)}</span>
                            </ChangeSpan>
                        )} */}
                    </MarketPriceInfo>
                </MarketAssetContainer>
            ))}
        </AssetsListContainer>
    )
}

export default MarketAssets;