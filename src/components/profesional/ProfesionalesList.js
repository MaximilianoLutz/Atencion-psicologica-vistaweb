import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { ProfesionalItem } from './ProfesionalItem';


function preventDefault(event) {
  event.preventDefault();
}

export default function ProfesionalesList({ profesionales = [] }) {



  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Profesionales
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            {/* <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>*/}

            <TableCell align="right">
              INGRESAR
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {profesionales.map((row) => {
            return <ProfesionalItem profesional={row} key={row.idHex} />
          })}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
