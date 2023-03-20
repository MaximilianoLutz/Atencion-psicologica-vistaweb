import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setPacienteActual } from '../../redux/features/Slices/pacientesSlice';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../pacientes/TablaPacientes/TablaPacientes';
import { ActiveModalItems } from './ActiveModalItems';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const SelectActiveModal = ({open}) => {

    const { pacientes } = useSelector(state => state.profesional);

    const [openClose, setOpenClose] = useState(open);

    const handleClose = ()=>{
        console.log('modalactiveclosed');
    }

    return (
        <React.Fragment>
            {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
                        <TableHead >
                            <TableRow sx={{ backgroundColor: 'warning.main' }}>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell align="right">Apellido</StyledTableCell>
                                <StyledTableCell align="right">Seleccionar</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pacientes?.map((paciente) => (
                              <ActiveModalItems paciente={paciente} setModalState={setOpenClose} key={paciente.id} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Modal>
        </React.Fragment>
    );



}
