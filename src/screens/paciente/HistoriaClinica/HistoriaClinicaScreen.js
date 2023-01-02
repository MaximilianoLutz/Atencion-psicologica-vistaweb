import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';

import { fetchConTokenBlob } from '../../../api/requestApi';
import { ip } from '../../../ip';
import CustomizedTablesHistoria from './CustomizedTablesHistoria';
import TablaTareas from '../../../components/pacientes/TablaTareas/TablaTareas';
import { gestionarDatosPaciente } from '../../../redux/features/Slices/pacientesSlice';

export const HistoriaClinicaScreen = () => {


  const  dispatch = useDispatchh();
  const navigate = useNavigate();

  const { id, nombre, apellido } = useSelector(state => state.pacientes.active);
  const { tarea } = useSelector(state => state.pacientes);
  const { historia } = useSelector(state => state.pacientes.detallePaciente);

  // const [ tareaLocal, setTareaLocal ] = useState([]);

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

  useEffect(() => {
    dispatch( gestionarDatosPaciente(`http://${ip}:8080/api/todo/${id}`, null));
  }, [id, tarea]);

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
              <TablaHistoriaClinica historia={historia} />
            </Paper>
          </Grid>

          <TablaTareas subjects={tarea} key={tarea.id} />

        </Grid>
      </Container>
    </>

  )
}
