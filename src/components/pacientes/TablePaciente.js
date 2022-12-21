import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { StyledTableRow, StyledTableCell } from './CustomizedTables';

import { setPacienteActual, setPacienteNull } from '../../redux/features/Slices/pacientesSlice';


export const TablePaciente = ({ paciente }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePaciente = () => {
        dispatch(setPacienteActual(paciente));
        navigate('/pacienteMainScreen');
    }

    const handlePacienteNull = () => {
        dispatch(setPacienteNull());
    }

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {paciente.nombre}
            </StyledTableCell>
            <StyledTableCell align="center">{paciente.apellido}</StyledTableCell>
            <StyledTableCell align="center">{paciente.dni}</StyledTableCell>
            <StyledTableCell align="right">
                <Button
                    onClick={handlePaciente}
                    >
                    Ir al Detalle
                </Button>

            </StyledTableCell>
            <StyledTableCell align="right">
                <NavLink
                    // to='/historia'
                    onClick={handlePacienteNull}
                    className="estiloBotonDash"
                >
                    <Button>
                        Ir a Historia Clinica
                    </Button>
                </NavLink>
            </StyledTableCell>

        </StyledTableRow>
    )
}
