import React from 'react';
import { DashboardScreen } from '../screens/DashboardScreen';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PreDashboard } from '../components/dashboard/PreDashboard';


export const ProfesionalRouter = () => {

    return (

        <>

            <Routes>

                <Route exact path="/dashboard" element={<DashboardScreen />} />
                <Route exact path="/inicio" element={<PreDashboard />} />
                <Route path="/" element={< Navigate to="/dashboard" />} />

            </Routes>
        </>



    )
}

