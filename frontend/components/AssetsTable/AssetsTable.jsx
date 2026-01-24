import { useState } from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { TokenIcon } from '@web3icons/react/dynamic'
import ModalWindow from "../ModalWindow/ModalWindow";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
    AssetNameSpan,
    Button,
    TableCell,
    TableContainer
} from "./AssetsTableStyled";
import { useRouter } from "next/router";

const AssetsTable = ({ assetsWallet }) => {
    const [openModal, setOpenModal] = useState(false);
    const [asset, setAsset] = useState({});
    const [operationType, setOperationType] = useState("");
    const router = useRouter();
    const { user } = useAuth();
    const { setFlashMessage } = useToast();

    const { userId } = user || {};

    const handleClick = (assetInfo, opType) => {
        setOpenModal(true);
        setAsset(assetInfo);
        setOperationType(opType);
    };
    const handleClose = () => {
        setOpenModal(false);
        setAsset({});
        setOperationType("");
    };

    const handleConfirm = async (quantityOfAsset, setFormError) => {
        if(quantityOfAsset <= 0) {
            setFormError("Quantity must be greater than 0");
            return;
        }

        const OPERATION_LABEL = {
            BUY: "buy",
            SELL: "sell"
        };

        const { assetId } = asset;

        try {
            const response = await fetch(`http://localhost:8080/transactions/${OPERATION_LABEL[operationType]}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    assetId,
                    quantity: quantityOfAsset
                })
            });

            const data = await response.text();

            if(!response.ok) {
                throw new Error(`You can't ${OPERATION_LABEL[operationType]} these asset`);
            }

            setFlashMessage({type: "success", message: data });
            router.reload();
        } catch (err) {
            setFlashMessage({type: "error", message: err.message || "Server unreachable" });
        }
    }

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
                    {assetsWallet.map((asset, id) => (
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
                            <TableCell>
                                <Button
                                    $buy
                                    onClick={() => handleClick({
                                        assetId: asset.assetId,
                                        name: asset.name,
                                        currentPrice: asset.currentPrice
                                    }, "BUY")}
                                >
                                    Buy
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => handleClick({
                                        assetId: asset.assetId,
                                        name: asset.name,
                                        currentPrice: asset.currentPrice
                                    }, "SELL")}
                                >
                                    Sell
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {openModal &&
            <ModalWindow
                handleClose={handleClose}
                assetInfo={asset}
                operationType={operationType}
                handleConfirm={handleConfirm}
            />
        }
        </>
    );
};

export default AssetsTable;