import React from 'react';
import { Button } from '@mui/material';
// import { pacienteActual } from '../../action/pacientesActions';
import { useDispatch } from 'react-redux';
import { StyledTableRow, StyledTableCell } from '../CustomizedTables';
import { NavLink } from 'react-router-dom';


export const TablePaciente = ({ paciente }) => {
    const dispatch = useDispatch();

    // const handlePaciente = () => {
    //     dispatch(pacienteActual(paciente));
    // }

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {paciente.nombre}
            </StyledTableCell>
            <StyledTableCell align="center">{paciente.apellido}</StyledTableCell>
            <StyledTableCell align="right">
                <Button
                    // onClick={handlePaciente}
                    >
                    Ir al Detalle
                </Button>

            </StyledTableCell>
            <StyledTableCell align="right">
                <NavLink
                    to='/historia'
                    // onClick={handlePaciente}
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
