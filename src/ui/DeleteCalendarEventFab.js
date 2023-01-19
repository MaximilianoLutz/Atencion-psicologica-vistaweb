import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteEvent } from '../redux/features/Slices/calendarSlice';

export const DeleteCalendarEventFab = () => {

  const dispatch = useDispatch();

  const { activeEvents } = useSelector( state => state.calendar ); 
  const { idHex } = useSelector( state => state.profesional.profesional);
  
  const data = {
    eventId: activeEvents.id, 
    profesionalId: idHex
  }

  const handleDelete = () => {
    dispatch( startDeleteEvent(data));
  }

  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleDelete}
    >
      <i className='fas fa-trash'></i>
      <span> Borrar eventos</span>

    </button>
  )
}
