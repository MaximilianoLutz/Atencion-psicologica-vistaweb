import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../pacientes/TablaPacientes/TablaPacientes';

export const CitasDelDia = () => {


    const { events } = useSelector(state => state.calendar);

    let citasDelDia;
    const now = moment();

    if (events) {

        citasDelDia = events.filter((e) => (moment(e.start).isSame(now, 'day')));
    }



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
                <TableHead >
                    <TableRow sx={{ backgroundColor: 'warning.main' }}>
                        <StyledTableCell>Paciente</StyledTableCell>
                        <StyledTableCell>Hora de Inicio</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {citasDelDia?.map((cita) => (
                        <StyledTableRow
                        key={cita.id}
                        >
                            <StyledTableCell align="left">{cita.title}</StyledTableCell>
                            <StyledTableCell component="th" scope="row"> {moment(cita.start).format("hh:mm A")} </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
