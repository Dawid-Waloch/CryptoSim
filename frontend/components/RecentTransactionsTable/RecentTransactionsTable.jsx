import { useEffect, useState } from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { TokenIcon } from "@web3icons/react/dynamic";
import {
    TableContainer,
    AssetNameSpan,
    TableCell,
    TypeSpan,
    Input
} from "./RecentTransactionsStyled";

const RecentTransactionsTable = ({ recentTransactions }) => {
    const sortedRecentTransactions = [...recentTransactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const [filteredTransactions, setFilteredTransactions] = useState([...sortedRecentTransactions]);
    const [assetSearch, setAssetSearch] = useState("");

    useEffect(() => {
        if(assetSearch.length > 0) {
            setFilteredTransactions([...sortedRecentTransactions].filter((transaction) => 
                transaction.name.toLowerCase().startsWith(assetSearch.toLowerCase()))
            )
        } else {
            setFilteredTransactions([...sortedRecentTransactions]);
        }
    }, [assetSearch])
    
    return (
        <>
            <Input
                type="text"
                aria-label="Search Assets"
                placeholder="Search Assets"
                value={assetSearch}
                onChange={(e) => setAssetSearch(e.target.value)}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell type="name">Asset Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map((transaction, id) => {
                            const date = new Date(transaction.createdAt);
                            const formattedDate = date.toLocaleString();
                            const isLast = id === filteredTransactions.length - 1;

                            return (
                                <TableRow key={id}>
                                    <TableCell $isLast={isLast}>{formattedDate}</TableCell>
                                    <TableCell $isLast={isLast}>
                                        <AssetNameSpan data-testid="dashboard-transactions-asset-name">
                                            <TokenIcon symbol={transaction.symbol} variant="branded" size={40} />
                                            {transaction.name}
                                        </AssetNameSpan>
                                    </TableCell>
                                    <TableCell $isLast={isLast}>{transaction.price}$</TableCell>
                                    <TableCell $isLast={isLast}>{transaction.quantity.toFixed(2)}</TableCell>
                                    <TableCell $isLast={isLast}>{transaction.value}$</TableCell>
                                    <TableCell $isLast={isLast}>
                                        <TypeSpan data-testid="dashboard-transactions-op-type" type={transaction.type}>
                                            {transaction.type}
                                        </TypeSpan>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default RecentTransactionsTable;