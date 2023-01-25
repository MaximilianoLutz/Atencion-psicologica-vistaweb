import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveNote, startDeleteEvent, startLoadingEvents } from '../redux/features/Slices/calendarSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const DeleteCalendarEventFab = () => {

  const dispatch = useDispatch();

  const { activeEvents } = useSelector(state => state.calendar);
  const { idHex } = useSelector(state => state.profesional.profesional);

  const data = {
    eventId: activeEvents.id,
    profesionalId: idHex
  }

  const handleDelete = () => {
    dispatch(startDeleteEvent(data));
    dispatch(clearActiveNote());
    dispatch(startLoadingEvents(idHex));
  }

  return (
    <Button
      startIcon={<DeleteForeverIcon />}
      color="error"
      variant="contained"
      sx={{
        bottom: '30px',
        left: '30px',
        position: 'fixed'
      }}
      onClick={handleDelete}
    >
      Borrar eventos
    </Button>
  )
}
