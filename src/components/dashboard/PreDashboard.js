import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button, Container, Grid, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import ProfesionalesList from '../profesional/ProfesionalesList';
import { clearProfesionalActive, setProfesionalActive } from '../../redux/features/Slices/ProfesionalSlice';
import { startLoadingProfesionalList } from '../../redux/features/Slices/authSlice';

export const PreDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profesionalesUser } = useSelector(state => state.auth);
    const { profesional } = useSelector( state => state.profesional );
    
    useEffect(() => {
        dispatch(clearProfesionalActive())
    }, [dispatch])

    useEffect(() => {
        dispatch(startLoadingProfesionalList())
    }, [dispatch])

    useEffect(() => {

        setProfesionales(profesionalesUser);
    }, [profesionalesUser])


    const [profesionales, setProfesionales] = useState([]);

    const handleFindProfe = async () => {

        setProfesionales(profesionalesUser);
        console.log(profesionales);
    }

    let idProf = typeof (profesional?.idHex);

    const redirection = () => {
        if (idProf === 'string') {
            navigate('/dashboard');
        }
    }
    useEffect(() => {
        redirection();
    }, [profesional]);

    const uniqueProfesional = () => {
        if (profesionalesUser.length === 1) {
            const [profesional] = profesionalesUser;
                dispatch(setProfesionalActive(profesional));
            console.log(profesional);
        }
    }

    useEffect(() => {
        uniqueProfesional();
    }, [profesionalesUser]);


    const mdTheme = createTheme();

    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                <Box component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >

                                    <NavLink
                                        to="/ingresarProfesional"
                                        className="resetColorMargin"
                                    >
                                        <Typography >
                                            Ingresar Profesional
                                        </Typography>
                                    </NavLink>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4} lg={3} >
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Button
                                        onClick={handleFindProfe}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'black'
                                            }} >
                                            Get Profesionales
                                        </Typography>
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <ProfesionalesList profesionales={profesionales} />
                                </Paper>
                            </Grid>

                            <NavLink
                                to="/dashboard"
                                className="resetColorMargin"
                            >
                                <Typography >
                                    Ir al Menu
                                </Typography>
                            </NavLink>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        </div >
    )
}
