import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConTokenMethod } from '../../api/requestApi';
import { useForm } from '../../hooks/useForm';


import { ip } from "../../ip";
import { guardarPaciente } from '../../redux/features/Slices/pacientesSlice';


export const IngresarPaciente = () => {

  const { idHex } = useSelector(state => state.profesional.profesional);

  const dispatch = useDispatch();

  const [formValues, handleInputChange, reset] = useForm({
    nombre: '',
    apellido: '',
    dni: '',
    p: {
      idHex
    }
  });

  const { nombre, apellido, dni } = formValues;
  
  const url = `http://${ip}:8080/api/pacientes`;
  
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(formValues);

    const data = await fetchConTokenMethod(url, formValues, 'POST');
    console.log(data);

    dispatch(guardarPaciente(formValues));


    reset();
  }

  
  console.log(formValues);
  return (
    <div className='container py-4'>
      <div className="card-body">
        <h4 className="card-header text-primary bg-dark">	Ingresar Nuevo Paciente </h4>
      </div>

      {/* {
              msgError &&
              (<div className="auth__alert-error">
                  { handleError(msgError) }
              </div>
              )
          } */}

      <form onSubmit={handleRegister} className="form-group">

        <input
          type="text"
          placeholder="Ingresa tu nombre"
          name="nombre"
          autoComplete="off"
          className="form-control"
          value={nombre}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="apelldo"
          name="apellido"
          className="form-control"
          autoComplete="off"
          value={apellido}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="DNI"
          name="dni"
          className="form-control"
          autoComplete="off"
          value={dni}
          onChange={handleInputChange}
        />

        {/* <input
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  className="auth__input"
                  value={password2}
                  onChange={handleInputChange}
              /> */}


        <button
          type='submit'
          className="btn btn-primary btn-block mb-5"

        >
          Confirmar
        </button>

        <br></br>

        <Link
          to="/"
          className="btn btn-success btn-block mb-5"
        >
          Listado de Pacientes
        </Link>
      </form>
    </div>
  )
}
