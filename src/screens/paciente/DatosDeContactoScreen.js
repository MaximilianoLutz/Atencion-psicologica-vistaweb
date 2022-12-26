import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, CardContent, Container, FormControl, Input, InputLabel, MenuItem, Select, Typography, TextField, Grid, Box
} from '@mui/material';
import moment from 'moment/moment';

import { useForm } from '../../hooks/useForm';
import { ip } from '../../ip';
import { gestionarDatosPaciente } from '../../redux/features/Slices/pacientesSlice';

export const DatosDeContactoScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { active: pacienteActivo } = useSelector(state => state.pacientes);
  const { idHex: uid } = useSelector(state => state.profesional.profesional);

  //inicializo contacto de paciente con datos previos si los hay sino creo objeto base
  const contactoBase = (!!pacienteActivo.contacto) ? { ...pacienteActivo.contacto }
    :
    {
      direccion: "",
      telefono: "",
      email: "",
      cuit: "",
      obraSocial: ""
    };



  // if (!!pacienteActivo.contacto) {
  //   console.log('tiene');
  //   var { id, ...res } = pacienteActivo.contacto;
  //   console.log(res);
  // } else {
  //   console.log('no tiene');
  // }


  const [paciente, setPaciente] = useState({
    ...pacienteActivo, contacto: { ...contactoBase },
    p: {
      idHex: uid
    }
  });
  const { contacto } = paciente;

  const [formValues, handleInputChange] = useForm(contacto);

  const { direccion, telefono, email, cuit, obraSocial } = formValues;


  const url = `http://${ip}:8080/api/contacto`;

  useEffect(() => {
    setPaciente({ ...paciente, contacto: { ...formValues } })

  }, [formValues]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const objetoFetch = {
      url, data: paciente, method: 'PUT'
    }

    dispatch(gestionarDatosPaciente(objetoFetch))

  }


  const handleReturn = () => {
    navigate("/pacienteMainScreen");
  }

  return (
    <Container fixed >

      <Card variant="outlined">
        <CardContent>
          <Typography
            align='center'
            variant="h3"
            sx={{
              color: 'primary.dark',
              bgcolor: 'success.light',
              letterSpacing: 4,
              textAlign: 'center'
            }}
          >
            Editar Datos de Contacto de <span>{paciente.nombre} </span>  <span>{paciente.apellido}</span>
          </Typography>

        </CardContent>
      </Card>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, padding: 2, border: '1px solid black' }}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth
              margin={'normal'}
            >


              <InputLabel htmlFor="direccion" >Direccion</InputLabel>
              <Input
                id="direccion"
                aria-describedby="direccion"
                type="text"
                placeholder="Direccion"
                name="direccion"
                autoComplete="off"
                className="form-control"
                value={direccion}
                onChange={handleInputChange}
                fullWidth

              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth
              margin={'normal'}
            >
              <InputLabel htmlFor="telefono" >Telefono</InputLabel>
              <Input
                id="telefono"
                aria-describedby="my-helper-text"
                type="text"
                placeholder="Telefono"
                name="telefono"
                autoComplete="off"
                className="form-control"
                value={telefono}
                onChange={handleInputChange}
                fullWidth={false}

              />
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>

            <FormControl
              fullW datosPreviosh={true}
              margin={'normal'}
            >
              <InputLabel htmlFor="email" >Email</InputLabel>
              <Input
                id="email"
                aria-describedby="my-helper-text"
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                className="form-control"
                value={email}
                onChange={handleInputChange}
                fullWidth={false}

              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth={true}
              margin={'normal'}
            >
              <InputLabel htmlFor="cuit" >Cuit</InputLabel>
              <Input
                id="cuit"
                aria-describedby="my-helper-text"
                type="text"
                placeholder="Cuit"
                name="cuit"
                autoComplete="off"
                className="form-control"
                value={cuit}
                onChange={handleInputChange}
                fullWidth={false}

              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth={true}
              margin={'normal'}
            >
              <InputLabel htmlFor="obraSocial" >Obra Social</InputLabel>
              <Input
                id="obraSocial"
                aria-describedby="my-helper-text"
                type="text"
                placeholder="Obra Socal"
                name="obraSocial"
                autoComplete="off"
                className="form-control"
                value={obraSocial}
                onChange={handleInputChange}
                fullWidth={false}

              />
            </FormControl>
          </Grid>

          <Button
            type="submit"
          >
            Guardar Datos de Cosntacto
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleReturn}
            sx={{ color: 'primary.dark', bgcolor: 'success.light', fontSize: 14 }}
          >
            Regresar
          </Button>
        </Grid>

      </Box>

    </Container>
  )
}

