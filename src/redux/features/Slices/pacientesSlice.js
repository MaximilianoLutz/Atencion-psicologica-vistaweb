import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod, fetchToken, validarToken } from '../../../api/requestApi';
import { ip } from '../../../ip';


const initialState = {
  listadoPacientes: [],
  active: { id: '', nombre: '', apellido: '', dni: '', active: false }
}




export const guardarPaciente = createAsyncThunk(
  'profesional/startLoadingPacientes',
  async (data, thunkAPI) => {

    const url = `http://${ip}:8080/api/pacientes`;

    const respuesta = await fetchConTokenMethod(url, data, 'POST');

    return respuesta.json();
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
          .addCase(guardarPaciente.pending, (state) => {

            console.log('pendingGuardarPaciente');
          })
          .addCase(guardarPaciente.fulfilled, (state, action) => {
            console.log(action.payload);

            console.log('filfilled');

          }).addCase(guardarPaciente.rejected, (state) => {

            console.log('rejectedGuardarPaciente');
          }) 

  },
});

export const { setPacientes, setPacienteActual, setPacienteNull } = pacientesSlice.actions;

export const selectPacientes = (state) => state;


export default pacientesSlice.reducer;
