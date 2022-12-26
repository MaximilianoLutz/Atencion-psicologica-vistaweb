import * as React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useForm } from '../../hooks/useForm';
import { ip } from '../../ip';
import { fetchConTokenMethod } from '../../api/requestApi';
import { useNavigate } from 'react-router-dom';

export default function IngresarProfesional({profesionalEdit}) {

  const navigate = useNavigate();
  const { uidAuth } = useSelector(state => state.auth);

  const profesionalInitValue = (!!profesionalEdit) ? (profesionalEdit) : ({
    nombre: '',
    apellido: '',
    matricula: '',
    matricula2: '',
    profesion: '',
    email: '',
    telefono: ''
  });

  const [formValues, handleInputChange] = useForm({...profesionalInitValue});

  const { nombre, apellido, matricula, matricula2, profesion, email, telefono } = formValues;

  console.log(formValues);

  const irAlInicio = ()=>{
    navigate('/inicio')
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const profesional = {
      ...formValues,
      uAuth: { uid: uidAuth }
    }

    const url = `http://${ip}:8080/api/entrypoint/profesional`

      const crearProfesional = await fetchConTokenMethod(url, profesional, 'POST');
    
    if(crearProfesional.idHex) irAlInicio();
    console.log(crearProfesional);
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
          Ingresar Datos de Profesional
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, padding:2 , border: '1px solid black' }}>
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
                id="lastName"
                name="matricula"
                value={matricula}
                onChange={handleInputChange}
                label="Matricula"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="address1"
                name="matricula2"
                value={matricula2}
                onChange={handleInputChange}
                label="Matricula2"
                fullWidth
                variant="standard"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="profesion"
                value={profesion}
                onChange={handleInputChange}
                label="Profesion"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="email"
                value={email}
                onChange={handleInputChange}
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="telefono"
                value={telefono}
                onChange={handleInputChange}
                label="Telefono"
                fullWidth
                autoComplete="phone"
                variant="standard"
              />
            </Grid>
          
          <Grid item xs={12}>
          <Button
            type="submit"
            color='success'
            fullWidth
            sx={{bgcolor: 'warning.light', fontSize: 14}}
          >
            Guardar
          </Button>
          </Grid>

          </Grid>
        </Box>

      </Container>
    </React.Fragment>
  );
}