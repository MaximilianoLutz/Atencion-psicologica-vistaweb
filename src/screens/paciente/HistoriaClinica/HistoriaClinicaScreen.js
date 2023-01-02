import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';

import { fetchConTokenBlob } from '../../../api/requestApi';
import { ip } from '../../../ip';
import CustomizedTablesHistoria from './CustomizedTablesHistoria';

export const HistoriaClinicaScreen = () => {


  const navigate = useNavigate();

  const { id, nombre, apellido } = useSelector(state => state.pacientes.active);
  const { active } = useSelector(state => state.pacientes);
  const { historia } = useSelector(state => state.pacientes.detallePaciente);

  const handleGetHistoria = async () => {

    const urlGet = `http://${ip}:8080/api/historiaspdf/${id}`;

    const respuestaPdf = await fetchConTokenBlob(urlGet, null);


  }

  const redirection = () => {
    if (!id) {
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    redirection();
  }, [id]);

  return (
    <>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>

          <Grid item xs={12}>

            <Button
              color='warning'
              fullWidth
              onClick={() => navigate('/redactarHistoriaClinicaScreen')}
              sx={{ bgcolor: 'success.light', fontSize: 14 }}
            >
              Redactar  historia
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              color='warning'
              fullWidth
              onClick={() => handleGetHistoria()}
              sx={{ bgcolor: 'success.light', fontSize: 14 }}
            >
              Descargar historia
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <CustomizedTablesHistoria historia={historia} />
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </>

  )
}
