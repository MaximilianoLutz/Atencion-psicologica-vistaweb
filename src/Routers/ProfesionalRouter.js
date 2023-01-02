import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PreDashboard } from '../components/dashboard/PreDashboard';
import { DashboardScreen } from '../screens/DashboardScreen';
import IngresarProfesional from '../screens/profesional/IngresarProfesional';
import { EditarProfesionalScreen } from '../screens/profesional/EditarProfesionalScreen';
import { IngresarPaciente } from '../screens/paciente/IngresarPaciente';
import { PacienteMainScreen } from '../screens/paciente/Main/PacienteMainScreen';
import { DatosFiliatoriosScreen } from '../screens/paciente/DatosFiliatoriosScreen';
import { DatosDeContactoScreen } from '../screens/paciente/DatosDeContactoScreen';
import { HistoriaClinicaScreen } from '../screens/paciente/HistoriaClinica/HistoriaClinicaScreen';
import { RedactarHistoriaClinicaScreen } from '../screens/paciente/HistoriaClinica/RedactarHistoriaClinicaScreen';


export const ProfesionalRouter = () => {

    return (

        <>

            <Routes> 

                <Route exact path="/inicio" element={<PreDashboard />} />
                <Route exact path="/dashboard" element={<DashboardScreen />} />

                <Route exact path="/ingresarProfesional" element={<IngresarProfesional />} />
                <Route exact path="/editarProfesionalScreen" element={<EditarProfesionalScreen />} />


                <Route exact path="/ingresarPaciente" element={<IngresarPaciente />} />
                <Route exact path="/pacienteMainScreen" element={<PacienteMainScreen />} />
                <Route exact path="/datosFiliatoriosScreen" element={<DatosFiliatoriosScreen />} />
                <Route exact path="/datosDeContactoScreen" element={<DatosDeContactoScreen />} />
                <Route exact path="/historiaClinicaScreen" element={<HistoriaClinicaScreen />} />
                <Route exact path="/redactarHistoriaClinicaScreen" element={<RedactarHistoriaClinicaScreen />} />

                <Route path="/" element={< Navigate to="/inicio" />} />

            </Routes>
        </>
    )
}

