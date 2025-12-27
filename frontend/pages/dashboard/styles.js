import styled from "styled-components";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const DasboardContainer = styled.div`
    width: 80%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
`;

export const DashboardInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
`;

export const BalanceCard = styled.div`
    border: 1px solid white;
    border-radius: 12px;
    grid-column: 1;
    grid-row: 1;
`;

export const BalanceText = styled.div`
    background: #3a0000;
    border-radius: 12px 12px 0 0;
    padding: 10px;
    font-weight: bold;
`;

export const BalanceValue = styled.div`
    font-size: 2em;
    padding: 5px 15px 15px 15px;
`;

export const BalanceInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const WalletIcon = styled(AccountBalanceWalletIcon)`
    padding: 5px 15px 15px 15px;
`;

export const MarketOverviewCard = styled(BalanceCard)`
    grid-column: 1;
    grid-row: 2;
`;

export const PriceChartCard = styled(BalanceCard)`
    grid-row: 1 / span 2;
    grid-column: 2;
`;

export const RecentTransactionsCard = styled(BalanceCard)`
    grid-row: 3;
    grid-column: 1 / span 2;
`;

export const MarketOverviewText = styled(BalanceText)``;

export const PriceChartText = styled(BalanceText)``;

export const RecentTransactionsText = styled(BalanceText)``;