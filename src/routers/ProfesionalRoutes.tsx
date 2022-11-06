import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../screens/Dashboard';

// import { ProfesionalMainScreen } from "../Components/Profesional/ProfesionalMainScreen";
// import { IngresarPaciente } from '../Components/Pacientes/IngresarPaciente';
// import { ListaPacientes } from '../Components/Pacientes/ListaPacientes';
// import { Paciente } from '../Components/Pacientes/Paciente';
// import { Navbar } from '../ui/NavBar'
// import ResponsiveAppBar from '../ui/ResponsiveAppBar';
// import { ListaPacientesDesdeProf } from '../Components/Pacientes/ListaPacientesDesdeProf';
// import { UpdatePaciente } from '../Components/Pacientes/UpdatePaciente';
// import { CalendarScreen } from '../Components/Calendario/CalendarScreen';
// import  Dashboard  from '../Components/dashboard/Dashboard';
// import IngresarProfesional from '../Components/Profesional/IngresarProfesional';
// import  { Historia }  from '../Components/textArea/Historia';
// import { PreDashboard } from '../Components/dashboard/PreDashboard';



export const ProfesionalRouter = () => {


    return (
        <>
            
            {/* <ResponsiveAppBar/> */}

            <Routes>

                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route exact path="/historia" element={ <Historia />} />
                <Route exact path="/form" element={<IngresarPaciente />} />
                <Route exact path="/profesional" element={<ProfesionalMainScreen />} />
                <Route exact path="/paciente/:idPaciente" element={<Paciente />} />
                <Route exact path="/pacientesP" element={<ListaPacientesDesdeProf />} />
                <Route exact path="/inicio" element={<PreDashboard />} />

                <Route exact path="/editarPaciente" element={<UpdatePaciente/>} />
                <Route exact path="/ingresarProfesional" element={<IngresarProfesional/>} />
                                
                <Route exact path="/calendario" element={<CalendarScreen />} /> */}

                <Route path="/" element={< Navigate to="/dashboard"/>}/>

            </Routes>

        
        </>
    )
}
