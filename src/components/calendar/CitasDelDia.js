import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../pacientes/TablaPacientes/TablaPacientes';

export const CitasDelDia = () => {


    const { events } = useSelector(state => state.calendar);

    let citasDelDia;
    const now = moment();
    let citasSortedByDate;
    let altura;

    if (events) {

        citasDelDia = events.filter((e) => (moment(e.start).isSame(now, 'day')));

        if(citasDelDia.length > 1){

             citasSortedByDate = citasDelDia.sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        }

        citasSortedByDate = citasDelDia

        // altura = (citasDelDia.length > 8 ) ? 400 : 200;
    }



    return (
        <TableContainer  sx={{ minWidth: 200, minHeight: 200 }} component={Paper}>
            <Table  size="small" aria-label="a dense table">
                <TableHead >
                    <TableRow sx={{ backgroundColor: 'warning.main' }}>
                        <StyledTableCell>Paciente</StyledTableCell>
                        <StyledTableCell>Hora de Inicio</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {citasSortedByDate?.map((cita) => (
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
