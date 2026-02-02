import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    AssetsListContainer,
    ChangeSpan,
    Image,
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
                <MarketAssetContainer key={id} onClick={() => setSelectedAsset({symbol: marketAsset.symbol, name: marketAsset.name})}>
                    <MarketAssetInfo>
                        <Image src={marketAsset.image} />
                        <MarketAssetNameContainer>
                            <MarketAssetName>{marketAsset.name}</MarketAssetName>
                            <span>{String(marketAsset.symbol).toUpperCase()}</span>
                        </MarketAssetNameContainer>
                    </MarketAssetInfo>
                    <MarketPriceInfo>
                        <MarketPrice>{Number(marketAsset.current_price).toFixed(2)}$</MarketPrice>
                        {marketAsset.price_change_percentage_24h >= 0 ? (
                            <ChangeSpan profit={true}>
                                <ArrowDropUpIcon />
                                <span>+{Number(marketAsset.price_change_percentage_24h).toFixed(2)}</span>
                            </ChangeSpan>
                        ) : (
                            <ChangeSpan>
                                <ArrowDropDownIcon />
                                <span>{Number(marketAsset.price_change_percentage_24h).toFixed(2)}</span>
                            </ChangeSpan>
                        )}
                    </MarketPriceInfo>
                </MarketAssetContainer>
            ))}
        </AssetsListContainer>
    )
}

export default MarketAssets;