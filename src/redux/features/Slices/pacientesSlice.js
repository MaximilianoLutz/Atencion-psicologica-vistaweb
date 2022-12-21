import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod  } from '../../../api/requestApi';
import { ip } from '../../../ip';


const initialState = {
  listadoPacientes: [],
  active: { id: '', nombre: '', apellido: '', dni: '', active: false }
}




export const gestionarDatosPaciente = createAsyncThunk(
  'paciente/gestionarDatos',
  async ({url, data, method}) => {
    
    console.log('-------------------------------');
    console.log(url);
    const respuesta = await fetchConTokenMethod(url, data, method);

    return respuesta;
  });


export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    setPacientes: (state, payload) => {


    },
    setPacienteActual: (state, {payload}) => {
      state.active.id = payload.id 
      state.active.apellido = payload.apellido
      state.active.nombre = payload.nombre
      state.active.dni = payload.dni
      state.active.active  = payload.acitve
      console.log(payload);


    },
    setPacienteNull: (state) => {
      state.active = initialState.active
    },
      },
      extraReducers: (builder) => {
        builder
          .addCase(gestionarDatosPaciente.pending, (state) => {

            console.log('gestionarDatosPaciente');
          })
          .addCase(gestionarDatosPaciente.fulfilled, (state, action) => {
            console.log(action.payload);

            console.log('filfilled');

          }).addCase(gestionarDatosPaciente.rejected, (state) => {

            console.log('rejectedGuardarPaciente');
          }) 

  },
});

export const { setPacientes, setPacienteActual, setPacienteNull } = pacientesSlice.actions;

export const selectPacientes = (state) => state;


export default pacientesSlice.reducer;
