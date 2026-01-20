import styled from "styled-components";
import {  TableContainer as MuiTableContainer } from "@mui/material";
import { AssetNameSpan as BaseAssetNameSpan, TableCell as BaseTableCell } from "../AssetsTable/AssetsTableStyled";

export const AssetNameSpan = styled(BaseAssetNameSpan)`
    min-width: 120px;
`;

export const TableCell = styled(BaseTableCell)`
    width: ${(props) =>
        props.type === "name" ? "200px" :
        "120px"};
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const TableContainer = styled(MuiTableContainer)`
    overflow-y: auto;
    max-height: 300px;
`;

export const TypeSpan = styled.span`
    font-weight: bold;
    color: ${(props) =>
        props.type === "BUY" ? "green" :
        props.type === "SELL" ? "red" :
        "black"};
`;

export const Input = styled.input`
    padding: 0.8rem 1rem;
    margin: 1rem 0 1rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;

    &:focus {
        border-color: #8b0000;
        outline: none;
        box-shadow: 0 0 8px #8b0000;
    }
`;
