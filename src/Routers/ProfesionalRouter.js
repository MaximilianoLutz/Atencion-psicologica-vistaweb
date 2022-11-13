import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import { DashboardScreen } from '../screens/DashboardScreen';
import { Navigate, Route, Routes } from 'react-router-dom';


export const ProfesionalRouter = () => {

    const dispatch = useDispatch();

    return (
      
                <>

             <Routes>

                 <Route exact path="/dashboard" element={<DashboardScreen />} />

                <Route path="/" element={< Navigate to="/dashboard"/>}/>

            </Routes>
            </>


    
    )
}


  
            {/* <div>

                Holaaaaaaaaaaaaaaaaaaaa

            </div>
            <Button

                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'warning.main' }}
                onClick={()=>dispatch(logout())}
            >
                Sign out
            </Button>
        </> */}