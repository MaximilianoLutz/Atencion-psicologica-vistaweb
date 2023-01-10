import React, { useState } from 'react';
import {
    Button, FormControl, Input, InputLabel, Typography, Grid, Box, TextField, MenuItem, Select,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { ip } from '../../../ip';
import { fetchConTokenMethod } from '../../../api/requestApi';
import { startLoadingTareas } from '../../../redux/features/Slices/pacientesSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModalAgregarTarea = () => {

    const { active } = useSelector(state => state.pacientes);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formValues, handleInputChange] = useForm({
        idPaciente: active.id,
        data: '',
        jerarquia: 1,
        fechaLimite: '2022-02-23'

    });

    const { idPaciente, data, jerarquia, fechaLimite } = formValues;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `http://${ip}:8080/api/todo`;


        const respuesta = await fetchConTokenMethod(url, formValues, 'POST');

        dispatch(startLoadingTareas(idPaciente));


        (respuesta) && setOpen(false);

    }

    return (
        <>
            <Button onClick={handleOpen}>Agregar Tarea</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
                    <Grid
                        container
                        spacing={2}>

                        <Grid item xs={12}>

                            <FormControl
                                fullWidth
                                margin={'normal'}
                            >
                                <TextField
                                    id="data"
                                    name="data"
                                    value={data}
                                    onChange={handleInputChange}
                                    multiline
                                    minRows={4}
                                    label="Tarea"
                                    fullWidth={true}
                                    variant="standard"

                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={6}>

                            <FormControl
                                fullWidth
                                margin={'normal'}
                            >
                                <InputLabel htmlFor="nacimiento">Fecha de Nacimiento</InputLabel>
                                <Input
                                    id="nacimiento"
                                    type="date"
                                    name='fechaLimite'
                                    className="form-control"
                                    value={fechaLimite}
                                    onChange={handleInputChange}
                                />

                            </FormControl>
                        </Grid>



                        <Grid item xs lg >
                            <FormControl >
                                <InputLabel id="prioridad">Nivel de prioridad</InputLabel>
                                <Select
                                    labelId="prioridad"
                                    label="Nivel de prioridad"
                                    name="jerarquia"
                                    value={jerarquia}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={0}>Baja</MenuItem>
                                    <MenuItem value={1}>Media</MenuItem>
                                    <MenuItem value={2}>alta</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>




                        <Grid item xs sm={0}>

                            <Button
                                type="submit"
                            >
                                Guardar Tarea
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button
                            onClick={handleClose}
                            sx={{ color: 'primary.dark', bgcolor: 'success.light', fontSize: 14 }}
                        >
                            Regresar
                        </Button>
                    </Grid>

                </Box>
                {/* <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar nueva tarea
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box> */}
            </Modal>
        </>
    )
}
