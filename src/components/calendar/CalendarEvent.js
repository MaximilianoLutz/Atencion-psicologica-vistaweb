import React from 'react';

export const CalendarEvent = ({ event }) => {

  return (
    <div>

        <span> {event.title} </span>
        <br/>
        <span> {event.notes} </span>
    </div>
  )
}
