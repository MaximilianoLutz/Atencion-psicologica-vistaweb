import React from 'react';
import { DashboardScreen } from '../screens/DashboardScreen';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PreDashboard } from '../components/dashboard/PreDashboard';
import IngresarProfesional from '../screens/profesional/IngresarProfesional';
import { setProfesionalActive } from '../redux/features/Slices/ProfesionalSlice';
import { IngresarPaciente } from '../components/pacientes/IngresarPaciente';
import { useEffect } from 'react';
import { DatosFiliatoriosScreen } from '../screens/paciente/DatosFiliatoriosScreen';
import { DatosDeContactoScreen } from '../screens/paciente/DatosDeContactoScreen';


export const ProfesionalRouter = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const { auth } = state;

    if (auth.profesionalesUser.length === 1) {

        const [profesional] = auth.profesionalesUser;
        dispatch(setProfesionalActive(profesional))

    } 
    return (

        <>

            <Routes> IngresarPaciente

                <Route exact path="/dashboard" element={<DashboardScreen />} />
                <Route exact path="/inicio" element={<PreDashboard />} />
                <Route exact path="/ingresarProfesional" element={<IngresarProfesional />} />

                <Route exact path="/ingresarPaciente" element={<IngresarPaciente />} />
                <Route exact path="/datosFiliatorios" element={<DatosFiliatoriosScreen />} />
                <Route exact path="/datosDeContacto" element={<DatosDeContactoScreen />} />
                
                <Route path="/" element={< Navigate to="/dashboard" />} />

            </Routes>
        </>
    )
}

