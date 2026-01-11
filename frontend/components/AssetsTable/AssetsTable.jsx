import { useState } from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TokenIcon } from '@web3icons/react/dynamic'
import ModalWindow from "../ModalWindow/ModalWindow";
import {
    AssetNameSpan,
    Button,
    ChangeSpan,
    TableCell,
    TableContainer
} from "./AssetsTableStyled";

const AssetsTable = ({ assetsWallet }) => {
    const [openModal, setOpenModal] = useState(false);
    const [asset, setAsset] = useState("");
    const [operationType, setOperationType] = useState("");

    const handleClick = (assetName, opType) => {
        setOpenModal(true);
        setAsset(assetName);
        setOperationType(opType);
    };
    const handleClose = () => {
        setOpenModal(false);
        setAsset("");
        setOperationType("");
    };

    return (
        <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Current Price</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Buy</TableCell>
                        <TableCell>Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assetsWallet.map((asset, id) => {
                        // TODO
                        // const change = (((currentPrice - asset.price) / asset.price) * 100).toFixed(2);

                        return (
                            <TableRow key={id}>
                                <TableCell>
                                    <AssetNameSpan>
                                        <TokenIcon symbol={asset.symbol} variant="branded" size={40} />
                                        {asset.name}
                                    </AssetNameSpan>
                                </TableCell>
                                <TableCell>{asset.quantity.toFixed(2)}</TableCell>
                                <TableCell>{asset.currentPrice}$</TableCell>
                                <TableCell>{asset.value}$</TableCell>
                                {/* <TableCell>
                                    {change >= 0 ? (
                                        <ChangeSpan profit>
                                            <ArrowDropUpIcon />
                                            {change}%
                                        </ChangeSpan>
                                    ) : (
                                        <ChangeSpan>
                                            <ArrowDropDownIcon />
                                            {change}%
                                        </ChangeSpan>
                                    )}
                                </TableCell> */}
                                <TableCell>
                                    <Button buy onClick={() => handleClick(asset.name, "BUY")}>Buy</Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleClick(asset.name, "SELL")}>Sell</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        {openModal &&
            <ModalWindow
                handleClose={handleClose}
                assetName={asset}
                operationType={operationType}
            />
        }
        </>
    );
};

export default AssetsTable;