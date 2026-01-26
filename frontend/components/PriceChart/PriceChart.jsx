import { TokenIcon } from '@web3icons/react/dynamic'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { createChart, CandlestickSeries } from 'lightweight-charts';
import {
    AssetChartContainer,
    AssetInfoChart,
    AssetName,
    AssetPrice,
    AssetPriceContainer,
    AssetTitleChart,
    ChangeSpan,
    ChartContainer,
    PercentageChangeSpan
} from './PriceChartStyled';
import { useEffect, useRef } from 'react';

const PriceChart = ({ assetInfo, assetPriceHistory }) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if(!chartContainerRef.current) return;

        const chartOptions = {
            layout: {
                background: { type: 'solid', color: 'rgba(0, 0, 0, 0.33)' },
                textColor: '#f2f2f2',
            },
            grid: {
                vertLines: { color: 'rgba(255,255,255,0.05)' },
                horzLines: { color: 'rgba(255,255,255,0.05)' },
            },
            timeScale: {
                borderColor: 'rgba(255,255,255,0.15)',
            },
            rightPriceScale: {
                borderColor: 'rgba(255,255,255,0.15)',
            },
        };

        const chart = createChart(chartContainerRef.current, chartOptions);

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#00c896',
            downColor: '#ff4d4f',
            wickUpColor: '#00c896',
            wickDownColor: '#ff4d4f',
            borderVisible: false,
        });

        candlestickSeries.setData(
            assetPriceHistory.map(price => ({
                time: price.time,
                open: price.open,
                high: price.high,
                low: price.low,
                close: price.close
            }))
        );
        
        chart.timeScale().fitContent();

        return () => chart.remove();
    }, [assetPriceHistory])

    const {
        name,
        symbol
    } = assetInfo || {}

    const sortedAssetPriceHistory = [...assetPriceHistory].sort(
        (a, b) => new Date(a.time) - new Date(b.time)
    )

    const currentPrice = sortedAssetPriceHistory[sortedAssetPriceHistory.length - 1]?.close;
    const previousPrice = sortedAssetPriceHistory[sortedAssetPriceHistory.length - 2]?.close;
    const change = (currentPrice - previousPrice).toFixed(2);
    const percentageChange = (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2);

    return (
        <AssetChartContainer>
            <AssetTitleChart>
                <TokenIcon symbol={symbol} variant="branded" size={55} />
                <AssetInfoChart>
                    <AssetName>{name}</AssetName>
                    <AssetPriceContainer>
                        <AssetPrice>{currentPrice}</AssetPrice>
                        {percentageChange >= 0 ? (
                            <ChangeSpan profit={true}>
                                <ArrowDropUpIcon />
                                <span>+{change}</span>
                                <PercentageChangeSpan>({percentageChange}%)</PercentageChangeSpan>
                            </ChangeSpan>
                        ) : (
                            <ChangeSpan>
                                <ArrowDropDownIcon />
                                <span>{change}</span>
                                <PercentageChangeSpan>({percentageChange}%)</PercentageChangeSpan>
                            </ChangeSpan>
                        )}
                    </AssetPriceContainer>
                </AssetInfoChart>
            </AssetTitleChart>
            <ChartContainer ref={chartContainerRef} />
        </AssetChartContainer>
    )
}

export default PriceChart;