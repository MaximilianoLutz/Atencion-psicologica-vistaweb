import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod, fetchToken, validarToken } from '../../../api/requestApi';
import { ip } from '../../../ip';


const initialState = {
  listadoPacientes: [],
  active: { id: '', nombre: '', apellido: '', dni: '' }
}




export const guardarPaciente = createAsyncThunk(
  'profesional/startLoadingPacientes',
  async (idProfesional, thunkAPI) => {

    const url = `http://${ip}:8080/api/pacientesP/${profesionalId}`;

    const pacientes = await fetchConTokenMethod(url, paciente, 'POST');

    return respuesta.json();
    throw Error
  });




export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    setPacientes: (state, payload) => {


    },
    setPacienteActual: (state, payload) => {
      state.active = { ...payload }

    },
    pacienteNull: (state) => {
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

export const { setPacientes, setPacienteActual, pacienteNull } = authSlice.actions;

export const selectPacientes = (state) => state;


export default pacientesSlice.reducer;
