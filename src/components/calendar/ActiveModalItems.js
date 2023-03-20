import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { StyledTableRow, StyledTableCell } from '../pacientes/TablaPacientes/TablaPacientes';

import { setPacienteActual } from '../../redux/features/Slices/pacientesSlice';


export const ActiveModalItems = ({ paciente, setModalState }) => {
    
    const dispatch = useDispatch();

    const handlePaciente = () => {
        console.log(paciente);
        dispatch(setPacienteActual(paciente));
        setModalState(false);

    }

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {paciente.nombre}
            </StyledTableCell>
            <StyledTableCell align="center">{paciente.apellido}</StyledTableCell>

            <StyledTableCell align="right">
                <Button
                    onClick={handlePaciente}
                    >
                    Seleccionar
                </Button>

            </StyledTableCell>

        </StyledTableRow>
    )
}
