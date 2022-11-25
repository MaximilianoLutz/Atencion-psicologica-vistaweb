import React from 'react';
import { DashboardScreen } from '../screens/DashboardScreen';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PreDashboard } from '../components/dashboard/PreDashboard';
import IngresarProfesional from '../screens/profesional/IngresarProfesional';
import { setProfesionalActive } from '../redux/features/Slices/ProfesionalSlice';


export const ProfesionalRouter = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const { auth, profesional } = state;
    
    console.log(state.auth.profesionalesUser);
    console.log(state.profesional.profesional);
    if (auth.profesionalesUser.length === 1) {

        const [profesional] = auth.profesionalesUser;
        dispatch(setProfesionalActive(profesional))
    }
    return (

        <>

            <Routes>

                <Route exact path="/dashboard" element={<DashboardScreen />} />
                <Route exact path="/inicio" element={<PreDashboard />} />
                <Route exact path="/ingresarProfesional" element={<IngresarProfesional />} />
                <Route path="/" element={< Navigate to="/dashboard" />} />

            </Routes>
        </>



    )
}

