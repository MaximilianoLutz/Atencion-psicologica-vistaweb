import React, { useEffect, useState } from 'react';

import moment from 'moment';
import swal from 'sweetalert2';
//import { isValid } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveNote, startAddNewEvent, startLoadingEvents, uiCloseModal } from '../../redux/features/Slices/calendarSlice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, Button, Divider, FormControl, Grid, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SaveIcon from '@mui/icons-material/Save';




const nowCustom = moment().minutes(0).seconds(0).add(1, 'hours'); // para q ponga fecha redonda y se pone afuera del componente pa q no se tenga q calcular todo el tiempo
const nowPlus1 = nowCustom.clone().add(1, 'hours');

const initEvent = { // fuera del componente para que no se este generando cada vez que se reinicia el componente
  start: nowCustom.toDate(),
  end: nowPlus1.toDate(),
  title: '',
  notes: '',
}

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

export const CalendarModal = () => {

  const { activeEvents, modalOpen } = useSelector(state => state.calendar);
  const { idHex } = useSelector(state => state.profesional.profesional);
  const { id } = useSelector(state => state.pacientes.active);

  const dispatch = useDispatch();

  //datepicker
  const [startDate, setStartDate] = useState(nowCustom.toDate());
  const [endDate, setEndDate] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);
  // const [duracion, setDuracion] = useState(20);


  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvents) {

      // const inicio = moment(activeEvents.start).format('YYYY-MM-DDThh:mm');
      // const fin = moment(activeEvents.end).format('YYYY-MM-DDThh:mm');
      // setStartDate(inicio);
      // setEndDate(fin);
      setFormValues(activeEvents);
    } else {
      const eventoDefinitivo = {
        // start: moment(start).format('YYYY-MM-DDThh:mm'),
        // end: moment(end).format('YYYY-MM-DDThh:mm'),
        ...initEvent,
        idProfesional: idHex,
        idPaciente: id
      }
      setFormValues(eventoDefinitivo);
    }
  }, [activeEvents, setFormValues]);



  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }


  const handleStartDateChange = (e) => {
  
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e
    })

  }

  const handleEndDateChange = (e) => {
    // console.log(e);
    // setDuracion(e);
    
    // const defineEndTime = moment(start).add(duracion, 'minute');
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e
    })
    console.log(formValues);
  }

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(clearActiveNote());
    setFormValues(initEvent);
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);



    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      swal.fire('Error', 'La fecha de finalizacio debe der posterior a la fecha de inicio', 'error');
      return
    }
    if (title.trim().length < 2) return setTitleValid(false);

    if (activeEvents) {
      dispatch(startAddNewEvent({ id: activeEvents.id, ...formValues }))
    } else {
      dispatch(startAddNewEvent({
        ...formValues
      }));
    }

    setTitleValid(true);
    dispatch(startLoadingEvents(idHex));
    closeModal();
  }


  return (

    <Modal
      open={modalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
        <Typography
          id="modal-modal-title" variant="h6"
          sx={{
            backgroundColor: 'primary.main',
            opacity: '0.8', color: 'white',
            align: 'center',
            marginBottom: '10px'
          }}
        >
          {(activeEvents) ? 'Editar turno' : 'Nuevo turno'}
        </Typography>

          <Divider variant='fullWidth' color='black' />

        <Grid id="modal-modal-description" container spacing={3} marginTop={'10px'}>

          {/* init Date  */}
          <Grid item>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Fecha y hora de Inicio"
                  renderInput={(params) => <TextField {...params} />}
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="Duracion">Duracion</InputLabel>
              <Select
                labelId="Duracion"
                label="Duracion"
                value={duracion}
                onChange={handleEndDateChange}
                defaultValue={60}
              >
                <MenuItem value={20}>20 minutos</MenuItem>
                <MenuItem value={30}>30 minutos</MenuItem>
                <MenuItem value={45}>45 minutos</MenuItem>
                <MenuItem value={60}>60 minutos</MenuItem>
              
              </Select>
            </FormControl>
          </Grid> */}

  
          <Grid item>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Fecha y hora de finalizacion"
                  renderInput={(params) => <TextField {...params} />}
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </LocalizationProvider>
            </FormControl>


          </Grid> 

          <Grid item  xs={12}>
            <FormControl fullWidth>
              <InputLabel id="titulo">Paciente</InputLabel>
              <Input
                id="titulo"
                type="text"
                placeholder="Nombre de Paciente a citar"
                name="title"
                value={title}
                onChange={handleInputChange}
                fullWidth={true}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                type="text"
                placeholder="Notas"
                rows="5"
                name="notes"
                value={notes}
                onChange={handleInputChange}
              ></TextField>
              <Typography>Información adicional</Typography>
            </FormControl>
          </Grid>

          <Grid item >
            <FormControl fullWidth>
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                  <SaveIcon color='black' fontSize='medium' />
                   Guardar
              </Button>
            </FormControl>
          </Grid>

        </Grid>
      </Box>
    </Modal>
  )
}
