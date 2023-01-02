import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { StyledTableRow, StyledTableCell } from './TablaPacientes';

import { setPacienteActual, setPacienteNull } from '../../../redux/features/Slices/pacientesSlice';


export const ItemsTablaTareas = ({ tarea }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handlePaciente = () => {
  //     dispatch(setPacienteActual(paciente));
  //     navigate('/pacienteMainScreen');
  // }

  // const handlePacienteNull = () => {
  //     dispatch(setPacienteNull());
  // }

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{paciente.fechaLimite}</StyledTableCell>
      <StyledTableCell component="th" scope="row"> {tarea.jerarquia} </StyledTableCell>
      <StyledTableCell align="left">{tarea.data}</StyledTableCell>
      <StyledTableCell align="right">
        <Button
          onClick={handlePaciente}
          sx={{backgroundColor:'red'}}
        >
          Eliminar
        </Button>

      </StyledTableCell>
    </StyledTableRow>
  )
}
