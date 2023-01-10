import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod, fetchConTokenSlice } from '../../../api/requestApi';
import { ip } from '../../../ip';


const initialState = {
  detallePaciente: {},
  active: { id: null, nombre: '', apellido: '', dni: '', active: false },
  tareas: []
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
  async ({ url, data, method = 'GET' }) => {

    const respuesta = await fetchConTokenMethod(url, data, method);

    return respuesta;
  });

export const startLoadingTareas = createAsyncThunk(
  'paciente/cargarTareas',
  async (id) => {

   console.log(id)

      const url = `http://${ip}:8080/api/todo/${id}`;
  
      const respuesta = await fetchConTokenMethod(url, null);
      console.log(respuesta);
      return respuesta
  });

export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    setPacienteActual: (state, { payload }) => {
      state.active.id = payload.id
      state.active.apellido = payload.apellido
      state.active.nombre = payload.nombre
      state.active.dni = payload.dni
      state.active.active = payload.acitve

    },
    setPacienteNull: (state) => {
      state.active = initialState.active
    },
    setTareas: (state, { payload }) => {
      state.tarea = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(StartLoadingPacienteById.pending, (state) => {

        console.log('pacientesByIdPending');
      })
      .addCase(StartLoadingPacienteById.fulfilled, (state, action) => {
        console.log(action.payload);
        state.detallePaciente = action.payload

        console.log('filfilledPacienteById');

      }).addCase(StartLoadingPacienteById.rejected, (state) => {

        console.log('rejectedrPacienteById');

      }).addCase(gestionarDatosPaciente.pending, (state) => {

        console.log('gestionarDatosPaciente');
      })
      .addCase(gestionarDatosPaciente.fulfilled, (state, action) => {

        state.tarea = action.payload;
        console.log(action.payload);

        console.log('filfilled');

      }).addCase(gestionarDatosPaciente.rejected, (state) => {

        console.log('rejectedGestionarPaciente');

      }).addCase(startLoadingTareas.pending, (state) => {

        console.log('tareasPending');
      })
      .addCase(startLoadingTareas.fulfilled, (state, action) => {

        state.tareas = action.payload

        console.log('filfilledTareas');

      }).addCase(startLoadingTareas.rejected, (state) => {

        console.log('rejectedTareas');

      });

  },
});

export const { setPacientes, setPacienteActual, setPacienteNull, setTareas } = pacientesSlice.actions;

export const selectPacientes = (state) => state;


export default pacientesSlice.reducer;
