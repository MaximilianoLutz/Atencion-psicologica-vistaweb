import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';

import { fetchConTokenBlob } from '../../../api/requestApi';
import { ip } from '../../../ip';

import { TablaTareas } from '../../../components/pacientes/TablaTareas/TablaTareas';
import {  startLoadingTareas } from '../../../redux/features/Slices/pacientesSlice';
import { ModalAgregarTarea } from '../../../components/pacientes/TablaTareas/ModalAgregarTarea';
import CustomizedTablesHistoria from './CustomizedTablesHistoria';

export const HistoriaClinicaScreen = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { id } = useSelector(state => state.pacientes.active);
  const { tareas } = useSelector(state => state.pacientes);
  const { historia } = useSelector(state => state.pacientes.detallePaciente);

  const redirection = () => {
    if (!id) {
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    redirection();
  }, [id]);

  // const tareasReloaded = useMemo(()=> tareas, [tareas]);

  useEffect(() => {
    dispatch(startLoadingTareas(id));
  }, []);




  const handleGetHistoria = async () => {

    const urlGet = `http://${ip}:8080/api/historiaspdf/${id}`;

    const respuestaPdf = await fetchConTokenBlob(urlGet, null);
  }

  const handleReturn = () => {

    navigate('/pacienteMainScreen');

  }

  return (
    <>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxHeight: '240px' }}>

              <Button
                color='warning'
                fullWidth={false}
                onClick={() => navigate('/redactarHistoriaClinicaScreen')}
                sx={{ bgcolor: 'success.light', fontSize: 14 }}
              >
                Redactar Historia Clinica
              </Button>

              <Button
                color='warning'
                fullWidth={false}
                onClick={handleGetHistoria}
                sx={{ bgcolor: 'success.light', fontSize: 14 }}
              >
                Descargar Historia Clinica completa
              </Button>

            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', maxHeight: '240px' }}>
              <CustomizedTablesHistoria historia={historia} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', maxHeight: '240px' }}>
              <TablaTareas subjects={tareas} key={tareas.id} />
            </Paper>
          </Grid>


          <ModalAgregarTarea />

        </Grid>

        <Grid item xs={12}>
          <Button
            color='warning'
            fullWidth
            onClick={handleReturn}
            sx={{ bgcolor: 'success.light', fontSize: 14 }}
          >
            Regresar
          </Button>
        </Grid>
      </Container>
    </>

  )
}
