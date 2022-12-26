import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Card, ListItemText } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { mainListItems, secondaryListItems } from './listItems';

import { startLogout } from '../../../redux/features/Slices/authSlice';
import { StartLoadingPacienteById } from '../../../redux/features/Slices/pacientesSlice';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Atención psicológica App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const { active } = useSelector(state => state.pacientes);
  const { detallePaciente } = useSelector(state => state.pacientes);
  const { datosFiliatorios, contacto } = detallePaciente;



  const redirection = () => {
    if (active.id.lenght < 2) {
      navigate('/inicio');
    }
  }

  useEffect(() => {
    redirection();
  }, [active]);

  useEffect(() => {
    dispatch(StartLoadingPacienteById(active.id))
  }, [active]);



  const handleLogout = () => {
    dispatch(startLogout());
  }

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              backgroundColor: 'success.main',
              // opacity: 0.6
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Pagina principal del paciente:  {active.nombre},  {active.apellido} DNI: {active.dni}
            </Typography>

            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
              <ListItemText primary="Cerrar Sesion" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: 'salmon',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs>
              Detalle de Datos del Paciente {active.nombre} {active.apellido}
            </Grid>

            <Grid container spacing={2} sx={{ mt: 4, mb: 4 }} direction="row">

              {
                (detallePaciente.datosFiliatorios)
                  ?
                  /* Datos filiatorios */
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography color={'primary.main'}>EstadoCivil: {datosFiliatorios.estadoCivil}</Typography>
                        <Typography>Estudios: {datosFiliatorios.estudios} </Typography>
                        <Typography color={'primary.main'}>Nacionalidad: {datosFiliatorios.nacionalidad}</Typography>
                        <Typography color={'primary.main'}>Derivacion: {datosFiliatorios.derivacion}</Typography>
                        <Typography color={'primary.main'}>Genero: {datosFiliatorios.genero}</Typography>
                        <Typography color={'primary.main'}>FechaAdmision: {datosFiliatorios.fechaAdmision}</Typography>
                        <Typography color={'primary.main'}>FechaNacimiento: {datosFiliatorios.fechaNacimiento}</Typography>
                      </CardContent>

                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => (console.log('editar'))}
                        >
                          Editar Datos Filiatorios
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  :
                  <Grid item xs={6}>
                    <Button
                      onClick={() => navigate('/datosFiliatoriosScreen')}
                    >
                      <Typography color={'darkred'}>Agregar Datos Filiatorios</Typography>

                    </Button>
                  </Grid>
              }

              {
                (detallePaciente.contacto)
                  ?
                  /* Datos de Contcto */
                  <Grid item xs>
                    <Card>
                      <CardContent>
                        <Typography color={'primary.main'}>Direccion: {contacto.direccion}</Typography>
                        <Typography>Telefono: {contacto.telefono} </Typography>
                        <Typography color={'primary.main'}>Email: {contacto.email}</Typography>
                        <Typography color={'primary.main'}>Cuit: {contacto.cuit}</Typography>
                        <Typography color={'primary.main'}>ObraSocial: {contacto.obraSocial}</Typography>
                      </CardContent>

                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => (console.log('editar'))}
                        >
                          Editar Datos de Contacto
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  :
                  <Grid item xs={6}>
                    <Button
                      onClick={() => navigate('/datosDeContactoScreen')}
                    >
                      <Typography color={'darkred'}>Agregar Datos de Contacto</Typography>

                    </Button>
                  </Grid>
              }
            </Grid>


            <Grid container spacing={2}>
              {/* Aqui tareas pendientes */}

              <Grid item xs>
                <Card>
                  <CardContent>

                    <Typography color={'primary.main'}>EstadoCivil: </Typography>
                    <Typography>Estudios:  </Typography>
                    <Typography color={'primary.main'}>Nacionalidad: </Typography>
                    <Typography color={'primary.main'}>Derivacion: </Typography>
                    <Typography color={'primary.main'}>Genero:</Typography>
                    <Typography color={'primary.main'}>FechaAdmision: </Typography>
                    <Typography color={'primary.main'}>FechaNacimiento: </Typography>

                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => (console.log('editar'))}
                    >
                      Editar Datos Filiatorios
                    </Button>
                  </CardActions>
                </Card>
              </Grid>


              {/* Fechas importantes */}
              <Grid item xs>
                <Card>

                </Card>
              </Grid>

            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export const PacienteMainScreen = () => {


  return (
    <DashboardContent />
  )
}
