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
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';

import TablaPacientes from '../pacientes/TablaPacientes/TablaPacientes';
import { startLogout } from '../../redux/features/Slices/authSlice';
import { startLoadingPacientes } from '../../redux/features/Slices/ProfesionalSlice';
import { CitasDelDia } from '../calendar/CitasDelDia';
import { startLoadingEvents } from '../../redux/features/Slices/calendarSlice';
import moment from 'moment/moment';
import { BirthdayTable } from '../notificaciones/BirthdayTable';


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



  const { profesional, pacientes } = useSelector(state => state.profesional);


  let idProfesional = typeof (profesional?.idHex);
  const redirection = () => {
    if (idProfesional !== 'string') {
      navigate('/inicio');
    }
  }

  useEffect(() => {
    redirection();
    dispatch(startLoadingPacientes(profesional.idHex));
  }, [profesional]);

  useEffect(() => {
    dispatch(startLoadingEvents(profesional.idHex));
  }, [profesional]);



  const handleLogout = () => {
    dispatch(startLogout());
  }

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const [tableVisibility, setTableVisibility] = useState({
  //   pacientes: 'none',
  //   citas: 'none',
  //   fechas: 'none'
  // });

  // // const tableVisibility = useRef({
  // //   pacientes: 'none',
  // //   citas: 'none',
  // //   fechas: 'none'})
  // const [citasView, setCitasView] = React.useState(false);
  
  // const citasState = ()=>{
  // setCitasView((state)=>{!state});

  // }

  // const titleButtonCitas = (citasView) ? "Ver tabla de citas" : "Ocultar tabla de citas";
  


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
              Le damos la bienvenida {profesional.nombre}  {profesional.apellido}
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
              backgroundColor: 'black',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon color='error' />
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
              theme.palette.mode === 'dark'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Grid container spacing={3}>
              {/* Citas del dia */}
              <Grid item xs={12} md={8} lg={9} sx={{display: 'inherit'}}
          >
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: 'success.light'

                  }}
                >

                  <Typography
                    component="h3"
                    variant="h4"
                    color={"black"}
                    alignContent='end'
                    fontWeight={'700'}
                  >
                    Citas del Dia {moment().format('DD/MM')}
                  </Typography>


                </Grid>

                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 400,
                    backgroundColor: 'success.dark'
                  }}
                >
                  <CitasDelDia />
                </Paper>
              </Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    backgroundColor: 'success.dark'
                  }}
                >
                  <BirthdayTable />
                </Paper>
              </Grid>

              {/* Pacientes activos */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'success.dark'
                  }}>
                  <TablaPacientes pacientes={pacientes} pacienteAction={'Desactivar'} />
                </Paper>
              </Grid>

            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
