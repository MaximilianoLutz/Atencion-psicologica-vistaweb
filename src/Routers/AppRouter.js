import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";

import { startChecking, startCheckingFinish } from "../redux/features/Slices/authSlice";
import { SignIn } from "../screens/auth/SingIn";
import { ProfesionalRouter } from "./ProfesionalRouter";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import SignUp from "../screens/auth/SingUp";



export default function AppRouter() {

  const dispatch = useDispatch();

  const { checking, uidAuth } = useSelector(state => state.auth);

  console.log(uidAuth);
  
  useEffect(() => {
    
    if (localStorage.getItem('access_token')?.length > 0 && !uidAuth) {
      
      dispatch(startChecking())
    }
  }, [dispatch]);

  useEffect(() => {

    if (uidAuth) {

      dispatch(startChecking());

    } else {
      
      dispatch(startCheckingFinish());
    }
  }, [dispatch, uidAuth, checking]);

  if (checking) return <h1>Loading...............</h1> //cambiar x un spinner

  return (
    <HashRouter>
      <Routes>

        <Route path="/auth/login/" element={
          <PublicRoutes>
            <SignIn />
          </PublicRoutes>
        } />

        <Route path="/*" element={
          <PrivateRoutes>
            <ProfesionalRouter />
          </PrivateRoutes>
        } />

        <Route 
          path= "/auth/register/"
          element={ <SignUp /> }
        />

      </Routes>
    </HashRouter>

  );
}
