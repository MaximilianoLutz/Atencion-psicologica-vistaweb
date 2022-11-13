import React from 'react';
import { DashboardScreen } from '../screens/DashboardScreen';
import { Navigate, Route, Routes } from 'react-router-dom';


export const ProfesionalRouter = () => {

    return (

        <>

            <Routes>

                <Route exact path="/dashboard" element={<DashboardScreen />} />

                <Route path="/" element={< Navigate to="/dashboard" />} />

            </Routes>
        </>



    )
}

