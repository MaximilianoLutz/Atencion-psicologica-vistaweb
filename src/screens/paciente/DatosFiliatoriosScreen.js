import React from 'react'

export const DatosFiliatoriosScreen = ({ pacienteActivo, uid }) => {


  const nacimiento = moment('1980-02-02')
  const nac = moment(nacimiento).format("yyyy-MM-DD");

  const admi = moment().toDate();
  const hoy = moment(admi).format("yyyy-MM-DD");


  console.log(hoy);

  const dt = (!!pacienteActivo.datosFiliatorios) ? { ...pacienteActivo.datosFiliatorios }
    :
    {
      derivacion: "",
      estadoCivil: 0,
      estudios: 0,
      fechaAdmision: hoy,
      fechaNacimiento: nac,
      genero: "",
      nacionalidad: "",
      ocupacion: ""
    };

  console.log(pacienteActivo);

  const datos = {
    derivacion: dt.derivacion,
    estadoCivil: dt.estadoCivil,
    estudios: dt.estudios,
    fechaAdmision: dt.fechaAdmision,
    fechaNacimiento: dt.fechaNacimiento,
    genero: dt.genero,
    nacionalidad: dt.nacionalidad,
    ocupacion: dt.ocupacion,
  }

  if (!!pacienteActivo.contacto) {
    console.log('tiene');
    var {id, ...res} = pacienteActivo.contacto;
    console.log(res);
  }else{
    console.log('no tiene');
  }


  const [paciente, setPaciente] = useState({
    ...pacienteActivo, contacto: {...res}, datosFiliatorios: { ...datos },
    p: {
      id: null,
      idHex: uid,
      nombre: null,
      apellido: null,
      matricula: null,
      matricula2: null,
      profesion: null,
      email: null,
      telefono: null,
    }
  });
  const { datosFiliatorios } = paciente;

  const [formValues, handleInputChange] = useForm(datosFiliatorios);

  const { derivacion, estadoCivil, estudios, fechaAdmision, fechaNacimiento, genero,
    nacionalidad, ocupacion } = formValues;


  console.log(fechaAdmision);


  // const handleFechaAdmisionAdapter = (event) => {

  //   const fecha = moment(event).format('YYYY-MM-DD')

  //   const target = {
  //     name: 'fechaAdmision',
  //     value: fecha
  //   }

  //   handleInputChange({ target });

  // }

  // const handleFechaNacimientoAdapter = (event) => {

  //   const fecha = moment(event).format('YYYY-MM-DD')

  //   const target = {
  //     name: 'fechaNacimiento',
  //     value: fecha
  //   }

  //   handleInputChange({ target });

  // }

  const url = `http://${ip}:8080/api/datos`;

  useEffect(() => {
    setPaciente({ ...paciente, datosFiliatorios: { ...formValues } })

  }, [formValues]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(paciente);

    const [data, stats] = await crearPaciente(url, paciente).then(d => d);
    console.log(data);
    console.log(stats);
  }

  console.log(formValues);



  return (
    <div className='container py-4'>

    <Card variant="outlined">
      <CardContent>
        <Typography
          align='center'
          variant="h3"
          color={"blue"}
          bgcolor={"black"}
        >
          Editar Datos Filiatorios de <span>{paciente.nombre} </span>  <span>{paciente.apellido}</span>
        </Typography>

      </CardContent>
      <br />

      <form onSubmit={handleSubmit}>

        {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
          <Grid container justifyContent='space-around'>
            <KeyboardDatePicker
              //disableToolbar
              variant='inline'
              format='dd/MM/yyyy'
              margin='normal'
              id='date-picker'
              label='Fecha de Admision'
              value={fechaAdmision}
              onChange={handleFechaAdmisionAdapter}

            />

          </Grid>

        </MuiPickersUtilsProvider> */}


        {/*      
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
        
            <KeyboardDatePicker
              disableToolbar
              //variant='inline'
              format='dd/MM/yyyy'
             // margin='normal'
              id='date-picker'
              label='Fecha de Nacimiento'
              value={fechaNacimiento}
              onChange={handleFechaNacimientoAdapter}

            />

        

        </MuiPickersUtilsProvider> */}


        <FormControl fullWidth>
          <InputLabel id="estadoCivil">Estado Civil</InputLabel>
          <Select
            labelId="estadoCivil"
            name="estadoCivil"
            value={estadoCivil}
            onChange={handleInputChange}
            label="Age"

          >
            <MenuItem value={0}>Soltero/a</MenuItem>
            <MenuItem value={1}>Casado/a</MenuItem>
            <MenuItem value={2}>Divorsiado/a</MenuItem>
            <MenuItem value={3}>Viudo/a</MenuItem>
            <MenuItem value={4}>Separado/a</MenuItem>
            <MenuItem value={5}>Concubinato</MenuItem>


          </Select>
        </FormControl>


        <FormControl fullWidth>
          <InputLabel id="estudios">Estudios</InputLabel>
          <Select
            labelId="estudios"
            name="estudios"
            value={estudios}
            onChange={handleInputChange}
            label="Age"

          >
            <MenuItem value={0}>Analfabeto</MenuItem>
            <MenuItem value={1}>Primario incompleto</MenuItem>
            <MenuItem value={2}>Primaro completo</MenuItem>
            <MenuItem value={3}>Secundario incompleto</MenuItem>
            <MenuItem value={4}>Secundario completo</MenuItem>
            <MenuItem value={5}>Terciario incompleto</MenuItem>
            <MenuItem value={6}>Terciario completo</MenuItem>
            <MenuItem value={7}>Universitario incompletp</MenuItem>
            <MenuItem value={8}>Universitario completo</MenuItem>
            <MenuItem value={9}>Postgrado</MenuItem>

          </Select>
        </FormControl>

        <FormControl
          fullWidth={true}
          margin={'normal'}
        >
          <InputLabel htmlFor="my-input" >Fecha de Admision</InputLabel>

          <Input
            id="my-input"
            //aria-describedby="my-helper-text"
            type="date"
            name="fechaAdmision"
            //autoComplete="off"
            className="form-control"
            value={fechaAdmision}
            onChange={handleInputChange}
            fullWidth={false}

          />
        </FormControl>

        <input
          type="date"
          name='fechaNacimiento'
          className="form-control"
          value={fechaNacimiento}
          onChange={handleInputChange}
        />


        <FormControl
          fullWidth={true}
          margin={'normal'}
        >


          <InputLabel htmlFor="genero" >Genero</InputLabel>
          <Input
            id="genero"
            aria-describedby="genero"
            type="text"
            placeholder="Genero"
            name="genero"
            autoComplete="off"
            className="form-control"
            value={genero}
            onChange={handleInputChange}
            fullWidth={false}

          />
        </FormControl>


        <FormControl
          fullWidth={true}
          margin={'normal'}
        >
          <InputLabel htmlFor="nacionalidad" >Nacionalidad</InputLabel>
          <Input
            id="nacionalidad"
            aria-describedby="my-helper-text"
            type="text"
            placeholder="Nacionalidad"
            name="nacionalidad"
            autoComplete="off"
            className="form-control"
            value={nacionalidad}
            onChange={handleInputChange}
            fullWidth={false}

          />
        </FormControl>

        <FormControl
          fullWidth={true}
          margin={'normal'}
        >
          <InputLabel htmlFor="derivacion" >Derivacion</InputLabel>
          <Input
            id="derivacion"
            aria-describedby="my-helper-text"
            type="text"
            placeholder="Derivacion"
            name="derivacion"
            autoComplete="off"
            className="form-control"
            value={derivacion}
            onChange={handleInputChange}
            fullWidth={false}

          />
        </FormControl>


        <FormControl
          fullWidth={true}
          margin={'normal'}
        >
          <InputLabel htmlFor="ocupacion" >Ocupacon</InputLabel>
          <Input
            id="ocupacion"
            aria-describedby="my-helper-text"
            type="text"
            placeholder="Ingrese ocupacion"
            name="ocupacion"
            autoComplete="off"
            className="form-control"
            value={ocupacion}
            onChange={handleInputChange}
            fullWidth={false}

          />
        </FormControl>

        <Button
          type="submit"
        >
          Guardar Datos Filiatorios
        </Button>

      </form>

    </Card>

  </div>
  )
}
