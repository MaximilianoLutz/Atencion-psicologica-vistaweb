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

export const DatosFiliatoriosScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { active: pacienteActivo } = useSelector(state => state.pacientes);
  const { idHex: uid } = useSelector(state => state.profesional.profesional);



  //fechas de nacimiento y admision iniciales para datePicker
  const nacimientoInicio = moment('1950-02-02');
  const nacimientoFormateado = moment(nacimientoInicio).format("yyyy-MM-DD");

  const admision = moment().toDate();
  const hoy = moment(admision).format("yyyy-MM-DD");


  //inicializo datosFiliatorios de paciente con datos previos si los hay sino creo objeto b
  const datos = (!!pacienteActivo.datosFiliatorios) ? { ...pacienteActivo.datosFiliatorios }
    :
    {
      derivacion: "",
      estadoCivil: 0,
      estudios: 0,
      fechaAdmision: hoy,
      fechaNacimiento: nacimientoFormateado,
      genero: "",
      nacionalidad: "",
      ocupacion: ""
    };

  if (!!pacienteActivo.contacto) {
    console.log('tiene');
    var { id, ...res } = pacienteActivo.contacto;
    console.log(res);
  } else {
    console.log('no tiene');
  }


  const [paciente, setPaciente] = useState({
    ...pacienteActivo, contacto: { ...res }, datosFiliatorios: { ...datos },
    p: {
      idHex: uid
    }
  });
  const { datosFiliatorios } = paciente;

  const [formValues, handleInputChange] = useForm(datosFiliatorios);

  const { derivacion, estadoCivil, estudios, fechaAdmision, fechaNacimiento, genero,
    nacionalidad, ocupacion } = formValues;


  const url = `http://${ip}:8080/api/datos`;

  useEffect(() => {
    setPaciente({ ...paciente, datosFiliatorios: { ...formValues } })

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
            Editar Datos Filiatorios de <span>{paciente.nombre} </span>  <span>{paciente.apellido}</span>
          </Typography>

        </CardContent>
      </Card>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, padding: 2, border: '1px solid black' }}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="estadoCivil">Estado Civil</InputLabel>
              <Select
                labelId="estadoCivil"
                label="Estado Civil"
                name="estadoCivil"
                value={estadoCivil}
                onChange={handleInputChange}
              >
                <MenuItem value={0}>Soltero/a</MenuItem>
                <MenuItem value={1}>Casado/a</MenuItem>
                <MenuItem value={2}>Divorsiado/a</MenuItem>
                <MenuItem value={3}>Viudo/a</MenuItem>
                <MenuItem value={4}>Separado/a</MenuItem>
                <MenuItem value={5}>Concubinato</MenuItem>


              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl fullWidth>
              <InputLabel id="estudios">Estudios</InputLabel>
              <Select
                label="Estudios"
                labelId="estudios"
                name="estudios"
                value={estudios}
                onChange={handleInputChange}
              >
                <MenuItem value={0}>Analfabeto</MenuItem>
                <MenuItem value={1}>Primario incompleto</MenuItem>
                <MenuItem value={2}>Primaro completo</MenuItem>
                <MenuItem value={3}>Secundario incompleto</MenuItem>
                <MenuItem value={4}>Secundario completo</MenuItem>
                <MenuItem value={5}>Terciario incompleto</MenuItem>
                <MenuItem value={6}>Terciario completo</MenuItem>
                <MenuItem value={7}>Universitario incompletp</MenuItem>
                <MenuItem value={8}>Universitario completo</MenuItem>
                <MenuItem value={9}>Postgrado</MenuItem>

              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth
              margin={'normal'}
            >
              <InputLabel htmlFor="my-input">Fecha de Admision</InputLabel>

              <Input
                id="my-input"
                //aria-describedby="my-helper-text"
                type="date"
                name="fechaAdmision"
                //autoComplete="off"
                className="form-control"
                value={fechaAdmision}
                onChange={handleInputChange}
                fullWidth={false}

              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth
              margin={'normal'}
            >
              <InputLabel htmlFor="nacimiento">Fecha de Nacimiento</InputLabel>
              <Input
                id="nacimiento"
                type="date"
                name='fechaNacimiento'
                className="form-control"
                value={fechaNacimiento}
                onChange={handleInputChange}
              />

            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth
              margin={'normal'}
            >


              <InputLabel htmlFor="genero" >Genero</InputLabel>
              <Input
                id="genero"
                aria-describedby="genero"
                type="text"
                placeholder="Genero"
                name="genero"
                autoComplete="off"
                className="form-control"
                value={genero}
                onChange={handleInputChange}
                fullWidth={false}

              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>

            <FormControl
              fullWidth
              margin={'normal'}
            >
              <InputLabel htmlFor="nacionalidad" >Nacionalidad</InputLabel>
              <Input
                id="nacionalidad"
                aria-describedby="my-helper-text"
                type="text"
                placeholder="Nacionalidad"
                name="nacionalidad"
                autoComplete="off"
                className="form-control"
                value={nacionalidad}
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
              <InputLabel htmlFor="derivacion" >Derivacion</InputLabel>
              <Input
                id="derivacion"
                aria-describedby="my-helper-text"
                type="text"
                placeholder="Derivacion"
                name="derivacion"
                autoComplete="off"
                className="form-control"
                value={derivacion}
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
              <InputLabel htmlFor="ocupacion" >Ocupacion</InputLabel>
              <Input
                id="ocupacion"
                aria-describedby="my-helper-text"
                type="text"
                placeholder="Ingrese ocupacion"
                name="ocupacion"
                autoComplete="off"
                className="form-control"
                value={ocupacion}
                onChange={handleInputChange}
                fullWidth={false}

              />
            </FormControl>
          </Grid>

          <Button
            type="submit"
          >
            Guardar Datos Filiatorios
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
