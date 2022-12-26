import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod  } from '../../../api/requestApi';
import { ip } from '../../../ip';


const initialState = {
  detallePaciente:{},
  active: { id: null, nombre: '', apellido: '', dni: '', active: false }
}


export const StartLoadingPacienteById = createAsyncThunk(
  'paciente/getPacienteById',
  async (id) => {
    
    const url = `http://${ip}:8080/api/pacientes/${id}`;

    const paciente = await fetchConTokenMethod(url, id);

    return paciente;
  });

export const gestionarDatosPaciente = createAsyncThunk(
  'paciente/gestionarDatos',
  async ({url, data, method}) => {
    
    const respuesta = await fetchConTokenMethod(url, data, method);

    return respuesta;
  });


export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
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

          }).addCase(StartLoadingPacienteById.pending, (state)=>{

            console.log('pacientesByIdPending');
          })
          .addCase(StartLoadingPacienteById.fulfilled, (state, action) => {
            console.log(action.payload);
            state.detallePaciente = action.payload

            console.log('filfilledPacienteById');

          }).addCase(StartLoadingPacienteById.rejected, (state) => {

            console.log('rejectedrPacienteById');
            
          })

  },
});

export const { setPacientes, setPacienteActual, setPacienteNull } = pacientesSlice.actions;

export const selectPacientes = (state) => state;


export default pacientesSlice.reducer;
