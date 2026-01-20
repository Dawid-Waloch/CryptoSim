import { useEffect, useState } from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { TokenIcon } from "@web3icons/react/dynamic";
import { TableContainer, AssetNameSpan, TableCell, TypeSpan, Input } from "./RecentTransactionsStyled";

const RecentTransactionsTable = ({ recentTransactions }) => {
    const [filteredTransactions, setFilteredTransactions] = useState([...recentTransactions].reverse());
    const [assetSearch, setAssetSearch] = useState("");

    useEffect(() => {
        if(assetSearch.length > 0) {
            setFilteredTransactions(recentTransactions.filter((transaction) => 
                transaction.name.toLowerCase().startsWith(assetSearch.toLowerCase())).reverse()
            )
        } else {
            setFilteredTransactions([...recentTransactions].reverse());
        }
    }, [assetSearch])
    
    return (
        <>
            <Input
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

                            return (
                                <TableRow key={id}>
                                    <TableCell>{formattedDate}</TableCell>
                                    <TableCell>
                                        <AssetNameSpan>
                                            <TokenIcon symbol={transaction.symbol} variant="branded" size={40} />
                                            {transaction.name}
                                        </AssetNameSpan>
                                    </TableCell>
                                    <TableCell>{transaction.price}$</TableCell>
                                    <TableCell>{transaction.quantity.toFixed(2)}</TableCell>
                                    <TableCell>{transaction.value}$</TableCell>
                                    <TableCell>
                                        <TypeSpan type={transaction.type}>
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