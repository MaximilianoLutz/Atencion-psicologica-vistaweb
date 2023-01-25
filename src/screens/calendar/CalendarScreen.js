import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { messages } from '../../helppers/calendar-messages-es';

import { CalendarEvent } from '../../components/calendar/CalendarEvent';
import { CalendarModal } from '../../components/calendar/CalendarModal';

import { NewFab } from '../../ui/NewFab';
import { DeleteCalendarEventFab } from '../../ui/DeleteCalendarEventFab';
import { calendarEventSetActive, clearActiveNote, startLoadingEvents, uiOpenModal } from '../../redux/features/Slices/calendarSlice';
import './stylesCalendar.css'

moment.locale('es');
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

  const dispatch = useDispatch();

  const { events, activeEvents } = useSelector(state => state.calendar);
  const { profesional } = useSelector(state => state.profesional);


  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {

    dispatch(startLoadingEvents(profesional.idHex));

  }, [dispatch])


  const onDoubleClickEvent = (e) => {
    dispatch(uiOpenModal());

  }

  const onSelectEvent = (e) => {
    dispatch(calendarEventSetActive(e));
  }

  const onViewChange = (e) => {
    setLastView(e);

    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    //console.log(e); TODO abrir modal con los datos de fecha q trae este evento al hacer dobleclick en una celda vacia
    dispatch(clearActiveNote());
  }



  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log( event, start, end, isSelected);
    const styles = {
      backgroundColor: 'red',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'

    }

    return { styles: styles }
  }

  //styles v 312
  return (


    <div className="calendar-screen">

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages} // helppers/calendar-messages-es
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        timeslots={1}
        step={60}
        view={lastView}
        min={new Date(2008, 0, 1, 8, 0)}
        max={new Date(2008, 0, 1, 23, 0)}
        components={{
          event: CalendarEvent
        }}
      />
      <NewFab />

      {
        (activeEvents) && <DeleteCalendarEventFab />
      }

      <CalendarModal />

    </div>


  )
}