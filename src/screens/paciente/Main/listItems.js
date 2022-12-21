import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
//import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link as LinkRouter } from 'react-router-dom';
import "../../../styles/stylesDash.css";
import { ArrowBack } from '@mui/icons-material';


export const mainListItems = (

  <React.Fragment>
    <LinkRouter to="/datosFiliatoriosScreen" className="estiloBotonDash">
      <ListItemButton>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Datos Filiatorios" />
      </ListItemButton>
    </LinkRouter>

    <LinkRouter to='/datosDeContactoScreen' className="estiloBotonDash">
      <ListItemButton >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Datos de Contacto" />
      </ListItemButton >
    </LinkRouter>

    <LinkRouter to="/ingresarProfesional" className="estiloBotonDash">
      <ListItemButton>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Ingresar Profesional" />
      </ListItemButton>
    </LinkRouter>

    <LinkRouter to="/ingresarPaciente" className="estiloBotonDash">
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Ingresar Paciente" />
    </ListItemButton>
    </LinkRouter>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment >
);

export const secondaryListItems = (
  <React.Fragment>
     <LinkRouter to="/inicio" className="estiloBotonDash">
    <ListItemButton>
      <ListItemIcon>
        <ArrowBack />
      </ListItemIcon>
      <ListItemText primary="Regresar al inicio" />
    </ListItemButton>
    </LinkRouter>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
    <LinkRouter to="/historia" className="estiloBotonDash" >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Historia C[inica" />
      </ListItemButton>
    </LinkRouter>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
