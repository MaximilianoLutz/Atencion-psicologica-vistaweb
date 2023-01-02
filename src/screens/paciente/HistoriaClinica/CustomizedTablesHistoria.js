import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHistoriaCLinica } from './TablaHistoriaCLinica';


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'warning.main',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTablesHistoria({ historia }) {

  console.log(historia);
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow sx={{ backgroundColor: 'warning.main' }}>
           
            <StyledTableCell align="right">Fecha</StyledTableCell>
           
            <StyledTableCell align="right">Descargar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historia?.map((h) => (
            <TableHistoriaCLinica historia={h} key={h.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
