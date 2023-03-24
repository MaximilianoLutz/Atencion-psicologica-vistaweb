import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import React from 'react';
import { useForm } from '../../hooks/useForm';


export const ForgottenPassword = () => {

  const theme = createTheme();

  const [ formValues, handleInputChange ] = useForm({email: ''});

  const {email} = formValues;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const url = `http://${ ip }:8080/api/user`;

    // const crearUser = await crearPaciente(url, formValues);
    
    // if (crearUser[1] === 201){
    //   dispatch(startLogin({email, password}));
    //   navigate('/');

    // }
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Restaurar contraseña
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'warning.main' }}
            >
              Restaurar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
