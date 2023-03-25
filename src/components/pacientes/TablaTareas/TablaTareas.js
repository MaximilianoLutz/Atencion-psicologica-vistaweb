import React, { useEffect, useRef } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ItemsTablaTareas } from './ItemsTablaTareas';
import { ip } from '../../../ip';
import { setTareas, startLoadingTareas } from '../../../redux/features/Slices/pacientesSlice';
import { fetchConTokenMethod } from '../../../api/requestApi';
import { useDispatch, useSelector } from 'react-redux';



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'warning.main',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
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



export const TablaTareas = ({ subjects = [] }) => {

  const dispatch = useDispatch();

  const { id } = useSelector(state => state.pacientes.active);

  const sub = useRef(subjects);

  useEffect(() => {
    handleGetTareas();

  }, [sub.current]);

  const handleGetTareas = () => {
    dispatch(startLoadingTareas(id));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow sx={{ backgroundColor: 'warning.main' }}>
            <StyledTableCell>Fecha Limite</StyledTableCell>
            <StyledTableCell>Importancia</StyledTableCell>
            <StyledTableCell align="center" aria-controls=''>Tarea</StyledTableCell>
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
