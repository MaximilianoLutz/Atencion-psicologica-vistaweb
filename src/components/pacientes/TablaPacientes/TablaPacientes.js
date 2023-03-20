import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ItemsTablePaciente } from './ItemsTablePaciente';
import { useEffect } from 'react';


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



export default function TablaPacientes({ pacientes, pacienteAction }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
        <TableHead >
          <TableRow sx={{ backgroundColor: 'warning.main' }}>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Apellido</StyledTableCell>
            <StyledTableCell align="right">DNI</StyledTableCell>
            <StyledTableCell align="right">Detalle</StyledTableCell>
            <StyledTableCell align="right">Eliminar de Pacientes Activos</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientes?.map((paciente) => (
            <ItemsTablePaciente paciente={paciente} key={paciente.id} action={pacienteAction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
