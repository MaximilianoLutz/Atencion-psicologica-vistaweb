import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { fetchConTokenMethod } from '../../api/requestApi';
import { ip } from '../../ip';
import { useForm } from '../../hooks/useForm';





export const HistoriaClinicaScreen = () => {

  const navigate = useNavigate();

  const { id, nombre, apellido } = useSelector(state => state.pacientes.active);

  const redirection = () => {
    if (!id) {
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    redirection();
  }, [id]);

  const [formValues, handleInputChange] = useForm({
    data: '',
    titulo: '',
    date: moment().format('YYYY-MM-DD')
  });

  const { data, titulo, date } = formValues;

  const dateUi = moment(date).format('DD-MM-YYYY');

  const urlPost = `http://${ip}:8080/api/historia`;

  const urlGet = `http://${ip}:8080/api/historias/${id}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      date,
      data,
      idPaciente:
        { id }

    }
    const respuesta = await fetchConTokenMethod(urlPost, obj, 'POST');
    console.log(respuesta);
  }
  const token = sessionStorage.getItem('access_token');

  const handleGetHistoria = async (e) => {
    e.preventDefault();
    const respuestaPdf = await fetchConTokenMethod(urlGet, null); 
    // const pdf =  await respuestaPdf.blob().then(p=>p);

    
        console.log(respuestaPdf);
  }
  return (

    <React.Fragment>
      <Container fixed sx={{ ml: 0 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'primary.dark',
            bgcolor: 'success.dark',
            letterSpacing: 6,
            textAlign: 'center'
          }}>
          Sesion del dia {dateUi} de {nombre} {apellido}
        </Typography>
        <Box component="form" noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, padding: 2, border: '1px solid black', mr: 0 }}>

          <Grid container spacing={3} >
            <Grid item xs={12} sm={6}>
              <TextField
                id="Titulo"
                name="titulo"
                value={titulo}
                onChange={handleInputChange}
                label="Titulo"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                minRows={20}
                id="Cuerpo Historia Clinica"
                name="data"
                value={data}
                onChange={handleInputChange}
                label="Cuerpo Historia Clinica"
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

        <Grid item xs={12}>
          <Button
            color='warning'
            fullWidth
            onClick={(e) => handleGetHistoria(e)}
            sx={{ bgcolor: 'success.light', fontSize: 14 }}
          >
            Descargar historia
          </Button>
        </Grid>

      </Container>
    </React.Fragment>
  )
}
