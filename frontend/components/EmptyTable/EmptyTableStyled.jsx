import styled from "styled-components";
import { TableRow as MuiTableRow } from "@mui/material"
import { TableCell as BaseTableCell } from "../AssetsTable/AssetsTableStyled";

export const TableCell = styled(BaseTableCell)``;

export const NoBorderTableCell = styled(TableCell)`
    border: none !important;
`

export const CellContent = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;