import * as React from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ItemsTablaTareas } from './ItemsTablaTareas';


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



export default function TablaTareas({ subjects }) {

 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow sx={{ backgroundColor: 'warning.main' }}>
          <StyledTableCell>Fecha Limite</StyledTableCell>
            <StyledTableCell>Importancia</StyledTableCell>
            <StyledTableCell align="center">Tarea</StyledTableCell>
            <StyledTableCell align="center">Borrar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects?.map((subject) => (
            <ItemsTablaTareas tarea={subject} key={subject.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
