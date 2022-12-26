import React from 'react';
import { useSelector } from 'react-redux';
import IngresarProfesional from './IngresarProfesional';

export const EditarProfesionalScreen = () => {

    const { profesional } = useSelector(state => state.profesional);

    

    return (
        <IngresarProfesional profesionalEdit={profesional} />
    )
}
