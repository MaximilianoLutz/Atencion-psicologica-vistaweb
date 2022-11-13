import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PublicRoutes = ({ children }) => {

    const { uidAuth } = useSelector( state => state.auth );

    return !!uidAuth
        ? <Navigate to="/" />
        : children
}
