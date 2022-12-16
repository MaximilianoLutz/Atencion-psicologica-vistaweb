import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchConTokenMethod } from '../../api/requestApi';
import { useForm } from '../../hooks/useForm';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import { ip } from "../../ip";
import { guardarPaciente } from '../../redux/features/Slices/pacientesSlice';


export const IngresarPaciente = () => {

  const { profesional } = useSelector(state => state.profesional);
  const { idHex } = profesional;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValues, handleInputChange, reset] = useForm({
    nombre: '',
    apellido: '',
    dni: '',
    active: true,
    p: {
      idHex
    }
  });

  const { nombre, apellido, dni } = formValues;


  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const url = `http://${ip}:8080/api/pacientes`;

    const data = await fetchConTokenMethod(url, formValues, 'POST');
    console.log(data);

    if (data.id) {
      // dispatch(guardarPaciente(formValues));
      alert('Paciente guardado correctamente')
      reset();
    }
  }

  const handleReturn = () => {
    navigate("/dashboard")
  }
  return (

    <React.Fragment>
      <Container fixed >


        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: 'primary.dark',
            bgcolor: 'success.light',
            letterSpacing: 6,
            textAlign: 'center'
          }}>
          Ingresar Datos de Paciente
        </Typography>
        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3, padding: 2, border: '1px solid black' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
                label="Nombre"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="apellido"
                value={apellido}
                onChange={handleInputChange}
                label="Apellido"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="dni"
                name="dni"
                value={dni}
                onChange={handleInputChange}
                label="dni"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color='success'
                fullWidth
                sx={{ bgcolor: 'warning.light', fontSize: 14 }}
              >
                Guardar
              </Button>
            </Grid>

          </Grid>
        </Box>


        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleReturn}
            sx={{ color:'primary.dark', bgcolor: 'success.light', fontSize: 14 }}
          >
            Regresar
          </Button>
        </Grid>

      </Container>




    </React.Fragment>

  )
}
