import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod, fetchToken, validarToken } from '../../../api/requestApi';
import { ip } from '../../../ip';


const initialState = {
    pacientes: [],
    pacientesInactivos: [],
    profesional: {
        idHex: null,
        nombre: null,
        apellido: null,
        matricula: null,
        matricula2: null,
        profesion: null,
        email: null,
        telefono: null
    }
}


export const startLoadingPacientes = createAsyncThunk(
  'profesional/startLoadingPacientes',
  async (profesionalId ) => {
    
    const url = `http://${ ip }:8080/api/pacientesAllActive/${profesionalId}`;

    const respuesta = await fetchConTokenMethod(url, null, 'GET');
    console.log(respuesta);

    return respuesta;
    
  });

  export const startLoadingPacientesInactivos = createAsyncThunk(
    'profesional/startLoadingPacientesInactivos',
    async (profesionalId ) => {
      
      const url = `http://${ ip }:8080/api/pacientesAllInactive/${profesionalId}`;
  
      const respuesta = await fetchConTokenMethod(url, null, 'GET');
      console.log(respuesta);
  
      return respuesta;
      
    });


export const profesionalSlice = createSlice({
  name: 'profesional',
  initialState,
  reducers: {
    clearProfesionalActive: (state) => {
      state.profesional = initialState.profesional;

    },
    setProfesionalActive: (state, action) => {
      state.profesional = action.payload;

    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(startLoadingPacientes.pending, (state) => {
        
        console.log('pending');
      })
      .addCase(startLoadingPacientes.fulfilled, (state, action) => {

        state.pacientes = action.payload
        console.log('fulfilledLoadingPacientes');
        console.log(action.payload);
    
      }).addCase(startLoadingPacientes.rejected, (state) => {
        
        state.pacientes = [];
        console.log('rejectedpacientes');
      }).addCase(startLoadingPacientesInactivos.fulfilled, (state, action) => {

        state.pacientesInactivos = action.payload
        console.log('fulfilledLoadingPacienteInactiva');
        console.log(action.payload);
    
      }).addCase(startLoadingPacientesInactivos.rejected, (state) => {
        
        state.pacientes = [];
        console.log('rejectedpacientesinactive');
      })
  },
});

export const {clearProfesionalActive, setProfesionalActive } = profesionalSlice.actions;

export const selectProfesional= (state) => state;


export default profesionalSlice.reducer;