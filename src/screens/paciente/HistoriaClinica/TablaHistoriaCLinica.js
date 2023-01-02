import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { StyledTableRow, StyledTableCell } from './CustomizedTablesHistoria';
import moment from 'moment/moment';

import { ip } from '../../../ip';
import { fetchConTokenBlob } from '../../../api/requestApi';


export const TableHistoriaCLinica = ({ historia }) => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.pacientes);


    const handleDescarga = () => {

        const url = `http://${ip}:8080/api/historiapdf/${active.id}/${historia.date}`;

        fetchConTokenBlob(url, null);
    }
    const dateUi = moment(historia.date).format('DD-MM-YYYY');
    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {dateUi}
            </StyledTableCell>
            <StyledTableCell align="right">
                <Button
                    onClick={handleDescarga}
                >
                    Descargar
                </Button>

            </StyledTableCell>
        </StyledTableRow>
    )
}
