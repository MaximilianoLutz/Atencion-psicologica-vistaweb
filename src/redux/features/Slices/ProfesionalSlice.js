import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchToken, validarToken } from '../../../api/requestApi';


const initialState = {
    pacientes: [],
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


// export const startLogin = createAsyncThunk(
//   'auth/startLogin',
//   async (data) => {

//     const { email, password } = data;
//     const response = await fetchToken(email, password);
//     // const { access_token, Name, Uid: uidAuth } = await response.json();

//     return response.json();
//   }
// );

// export const startChecking = createAsyncThunk(
//   'auth/startChecking',
//   async ( data, thunkAPI) => {
//     const respuesta = await validarToken();
//     if (respuesta) {

//        return respuesta
//     } else {
//       thunkAPI.dispatch(logout());   
//       throw Error   
//     }

//   }
// )

export const startLoadingPacientes = createAsyncThunk(
  'profesional/startLoadingPacientes',
  async (profesionalId, thunkAPI) => {

    const url = `http://${ ip }:8080/api/pacientesP/${profesionalId}`;

    const pacientes = await fetchConTokenMethod(url);

    return respuesta.json();
    throw Error
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
        console.log(action.payload);

        state.pacientes = action.payload.pacientes
        console.log('filfilled');
    
      }).addCase(startLoadingPacientes.rejected, (state) => {
        
        state.pacientes = [];
        console.log('rejectedpacientes');
      })
  //     .addCase(startChecking.pending, (state) => {
  //       // state.checking = true;
  //       console.log('pendingToken');
  //     })
  //     .addCase(startChecking.fulfilled, (state, action) => {
  //       const token = localStorage.getItem('access_token');
  //       const tokenSplit = token.split('.');
  
  //       let tkUser = atob(tokenSplit[1]);
  //       let userJson = JSON.parse(tkUser)

  //       state.checking = false;
  //       state.uidAuth = userJson.Uid;
  //       state.name = userJson.Name;
     
  //       console.log('filfilledToken');

  //     }).addCase(startChecking.rejected, (state) => {
  //       state.checking = false;
  //       state.uidAuth = null;
  //       state.name = null;
  //       state.profesionalesUser = [];
  //       console.log('rejectedToken');
  //     });
  },
});

export const {clearProfesionalActive, setProfesionalActive } = profesionalSlice.actions;

export const selectProfesional= (state) => state;


export default profesionalSlice.reducer;