import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TablaPacientes from '../../components/pacientes/TablaPacientes/TablaPacientes';
import { startLoadingPacientesInactivos } from '../../redux/features/Slices/ProfesionalSlice';

export const PacientesInactivosScreen = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

    const { pacientesInactivos, profesional } = useSelector(state => state.profesional);
    
    useEffect(() => {
     dispatch(startLoadingPacientesInactivos(profesional.idHex));
     
    }, []);
    


  return (
     <TablaPacientes  pacientes={pacientesInactivos} pacienteAction={'Activar'} />
  )
}
