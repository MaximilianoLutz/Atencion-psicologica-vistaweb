import React, { useEffect, useState } from 'react';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import swal from 'sweetalert2';
//import { isValid } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { clearActiveNote, startAddNewEvent, startLoadingEvents, uiCloseModal } from '../../redux/features/Slices/calendarSlice';
//import { calendarEventAddNew, calendarEventUpdated, clearActiveNote, eventStartLoading, startAddNewEvent } from '../../action/calendar/calendarEvents';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const nowCustom = moment().minutes(0).seconds(0).add(1, 'hours'); // para q ponga fecha redonda y se pone afuera del componente pa q no se tenga q calcular todo el tiempo
const nowPlus1 = nowCustom.clone().add(1, 'hours');

const initEvent = { // fuera del componente para que no se este generando cada vez que se reinicia el componente
  start: nowCustom.toDate(),
  end: nowPlus1.toDate(),
  title: '',
  notes: '',
}

export const CalendarModal = () => {

  const { activeEvents, modalOpen } = useSelector(state => state.calendar);
  const { idHex } = useSelector(state => state.profesional.profesional);
  const { id } = useSelector(state => state.pacientes.active);

  const dispatch = useDispatch();

  //datepicker
  const [startDate, setStartDate] = useState(new Date(nowCustom));
  const [endDate, setEndDate] = useState(new Date(nowPlus1));
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvents) {
      setStartDate(activeEvents.start);
      setEndDate(activeEvents.end);
      setFormValues(activeEvents);
    } else {
      const eventoDefinitivo = {
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
    console.log(e);
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e
    })

  }

  const handleEndDateChange = (e) => {
    console.log(e);
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e
    })

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
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      style={customStyles}
      className={"modal"}
      overlayClassName="modal-fondo"
    >
      <h1>{(activeEvents) ? 'Editar Evento' : 'Nuevo evento'} </h1>
      <hr />
      <form
        className="container"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'} `}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary w-100"
        >
          <i className="fas fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
