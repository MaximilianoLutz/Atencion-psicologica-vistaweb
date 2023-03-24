import React, { useEffect } from "react";
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
import '../styles/spinner.css';
import { ForgottenPassword } from "../screens/auth/ForgottenPassword";



export default function AppRouter() {

  const dispatch = useDispatch();

  const { checking, uidAuth, profesionalesUser } = useSelector(state => state.auth);
  const { profesional } = useSelector(state => state.profesional);

  const checkTokenexpireTime = () => {

    const dateAux = new Date().getTime() - 3500;
    const tokenInit = sessionStorage.getItem('token-init-date') || dateAux;

    console.log(tokenInit);

    const diferencia = (new Date().getTime()) - tokenInit;

    console.log(diferencia);

  }

  useEffect(() => {
    checkTokenexpireTime()
  }, [])


  useEffect(() => {
    const access_token = (localStorage.getItem('access_token')) ? localStorage.getItem('access_token') : '';

    if (access_token.length > 0 && !uidAuth) {

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


  if (checking)
    return (
      <div className="spinner-container"> <div className="spinner"></div> </div>
    )


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
          path="/auth/register/"
          element={<SignUp />}
        />

        <Route
          path="/auth/forgottenPassword/"
          element={<ForgottenPassword />}
        />

      </Routes>
    </HashRouter>

  );
}
