import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoutes = ({ children }) => {

    const {  uidAuth } = useSelector(state => state.auth);

    return !!uidAuth
    ? children
    :  <Navigate to="/auth/login/" />
}

