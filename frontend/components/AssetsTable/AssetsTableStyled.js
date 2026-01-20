import styled from "styled-components";
import { TableCell as MuiTableCell, TableContainer as MuiTableContainer } from "@mui/material";

export const Button = styled.button`
    background: ${(props) =>
        props.$buy
            ? "linear-gradient(135deg, green, darkgreen)"
            : "linear-gradient(135deg, red, darkred)"
    };
    color: white;
    border-radius: 12px;
    padding: 10px 22px;
    border: none; 
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const TableContainer = styled(MuiTableContainer)`
    max-height: 240px;
    overflow-y: auto;
`

export const TableCell = styled(MuiTableCell)`
    color: white !important;
    font-size: 0.95rem !important;
    padding: 12px 16px !important;
    white-space: nowrap;
`;

export const ChangeSpan = styled.span`
    display: flex;
    align-items: center;
    color: ${(props) => (props.profit ? "green" : "red")};
    font-weight: bold;
`;

export const AssetNameSpan = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
`;