import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { StyledTableRow, StyledTableCell } from './TablaPacientes';

import { setPacienteActual, setPacienteNull } from '../../../redux/features/Slices/pacientesSlice';
import { ip } from '../../../ip';
import { fetchConTokenMethod } from '../../../api/requestApi';
import { startLoadingPacientes } from '../../../redux/features/Slices/ProfesionalSlice';


export const ItemsTablePaciente = ({ paciente, action }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profesional } = useSelector(state => state.profesional);

    let isActive;

    switch (action) {
        case 'Desactivar':
            isActive = false
            break;

        case 'Activar':
            isActive = true
            break;

        default:
            break;
    }

    const handlePaciente = () => {
        dispatch(setPacienteActual(paciente));
        navigate('/pacienteMainScreen');
    }

    const handlePacienteInactivo = async () => {


        const pacienteAction = {
            ...paciente,
            active: isActive,
            p: {
                ...profesional
            }

        }
        console.log(pacienteAction);
        const url = `http://${ip}:8080/api/pacientes`;

        const data = await fetchConTokenMethod(url, pacienteAction, 'POST');
        console.log(data);

        dispatch(startLoadingPacientes(profesional.idHex));
        (isActive) && navigate('/dashboard');
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
                <Button
                    color='error'
                    onClick={handlePacienteInactivo}

                >
                    {action}
                </Button>
            </StyledTableCell>

        </StyledTableRow>
    )
}
