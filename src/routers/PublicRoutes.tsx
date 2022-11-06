import React from 'react';
// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({ children }: any) => {

    // const { uidAuth } = useSelector( state => state.auth );

    // return !!uidAuth
    return false
        ? <Navigate to="/" />
        : children
}
