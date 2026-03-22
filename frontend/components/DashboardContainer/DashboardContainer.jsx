import WalletDropdown from "../../components/WalletDropdown/WalletDropdown";
import AssetsTable from "../../components/AssetsTable/AssetsTable";
import RecentTransactionsTable from "../../components/RecentTransactionsTable/RecentTransactionsTable";
import EmptyTable from "../../components/EmptyTable/EmptyTable";
import PriceChart from "../../components/PriceChart/PriceChart";
import {
    BalanceCard,
    BalanceInfo,
    BalanceText,
    DashboardWrapper,
    DashboardInfo,
    MarketOverviewCard,
    MarketOverviewText,
    PriceChartCard,
    PriceChartText,
    RecentTransactionsCard,
    RecentTransactionsText,
} from "./DashboardContainerStyled";

const DashboardContainer = (props) => {
    const {
        wallets,
        assetsWallet,
        assetInfo,
        assetPriceHistory,
        recentTransactions,
        username
    } = props

    return (
        <DashboardWrapper>
            <h2>Welcome, {username}!</h2>
            <DashboardInfo>
                <BalanceCard>
                    <BalanceText>Account Balance:</BalanceText>
                    <BalanceInfo>
                        {wallets.length > 0 ? (
                            <WalletDropdown wallets={wallets} />
                        ) : (
                            <div>You don't have any wallet</div>
                        )}
                    </BalanceInfo>
                </BalanceCard>
                <PriceChartCard>
                    <PriceChartText>Price chart:</PriceChartText>
                    <PriceChart
                        assetInfo={assetInfo}
                        assetPriceHistory={assetPriceHistory}
                    />
                </PriceChartCard>
                <MarketOverviewCard>
                    <MarketOverviewText>Market Overview:</MarketOverviewText>
                    {assetsWallet.length > 0 ? (
                        <AssetsTable assetsWallet={assetsWallet} wallets={wallets} />
                    ) : (
                        <EmptyTable
                            cells={["Asset", "Quantity", "Current Price", "Value", "Buy", "Sell"]}
                            message={"You don't have any bought assets"}
                        />
                    )}
                </MarketOverviewCard>
                <RecentTransactionsCard>
                    <RecentTransactionsText>Recent Transactions:</RecentTransactionsText>
                    {recentTransactions.length > 0 ? (
                        <RecentTransactionsTable recentTransactions={recentTransactions} />
                    ) : (
                        <EmptyTable
                            cells={["Date", "Asset Name", "Price", "Quantity", "Value", "Type"]}
                            message={"You don't have any transactions"}
                        />
                    )}
                </RecentTransactionsCard>
            </DashboardInfo>
        </DashboardWrapper>
    )
}

export default DashboardContainer