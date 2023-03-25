import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { StyledTableRow, StyledTableCell } from './TablaTareas';

import {  setTareas, startLoadingTareas } from '../../../redux/features/Slices/pacientesSlice';
import { ip } from '../../../ip';
import { fetchConTokenMethod } from '../../../api/requestApi';


export const ItemsTablaTareas = ({ tarea  }) => {

  const dispatch = useDispatch();

  const { id } = useSelector(state => state.pacientes.active);


  const handleDelete = async () => {

    const url= `http://${ip}:8080/api/todo`;


    const respuesta = await fetchConTokenMethod(url, tarea, 'DELETE' );

   dispatch(startLoadingTareas(id));

  }



  return (
    <StyledTableRow>
      <StyledTableCell align="center">{tarea.fechaLimite}</StyledTableCell>
      <StyledTableCell component="th" scope="row"> {tarea.jerarquia} </StyledTableCell>
      <StyledTableCell align="left">{tarea.data}</StyledTableCell>
      <StyledTableCell align="right">
        <Button
          onClick={handleDelete}
          sx={{ backgroundColor: 'red' }}
        >
          Eliminar
        </Button>

      </StyledTableCell>
    </StyledTableRow>
  )
}
