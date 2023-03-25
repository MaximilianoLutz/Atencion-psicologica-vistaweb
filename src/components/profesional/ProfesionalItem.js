import React from 'react'
import { useDispatch } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { setProfesionalActive } from '../../redux/features/Slices/ProfesionalSlice';


export const ProfesionalItem = ({ profesional }) => {

    const dispatch = useDispatch();

  const handleSelectProfe = ()=>{
    dispatch(setProfesionalActive(profesional));

  }


    return (
        <TableRow >
            <TableCell>{profesional.nombre}</TableCell>
            <TableCell>{profesional.apellido}</TableCell>
            {/* <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>*/}
            <TableCell align="right">  <Button
                onClick={handleSelectProfe}
            >
                Dispachar profe
            </Button></TableCell>
        </TableRow>
    )
}
