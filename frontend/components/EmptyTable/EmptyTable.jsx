import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import { CellContent, NoBorderTableCell, TableCell } from "./EmptyTableStyled"

const EmptyTable = ({ cells, message }) => (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    {cells.map((cell, id) => (
                        <TableCell key={id}>{cell}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <NoBorderTableCell colSpan={cells.length}>
                        <CellContent>
                            <InfoIcon />
                            {message}
                        </CellContent>
                    </NoBorderTableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
)

export default EmptyTable