import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod, fetchToken, validarToken } from '../../../api/requestApi';
import { ip } from '../../../ip';
import { clearProfesionalActive } from './ProfesionalSlice';


const initialState = {
  checking: true,
  uidAuth: null,
  name: null,
  profesionalesUser: []
}


export const startLogin = createAsyncThunk(
  'auth/startLogin',
  async (data) => {

    const { email, password } = data;
    const response = await fetchToken(email, password);
    // const { access_token, Name, Uid: uidAuth } = await response.json();

    return response.json();
  }
);

export const startChecking = createAsyncThunk(
  'auth/startChecking',
  async (data, thunkAPI) => {
    const respuesta = await validarToken();
    if (respuesta) {

      return respuesta
    } else {
      thunkAPI.dispatch(logout());
      throw Error
    }

  }
)

export const startLoadingProfesionalList = createAsyncThunk(
  'auth/startLoadingProfesionalList',
  async (data, thunkAPI) => {

    const { uidAuth } = thunkAPI.getState().auth;

    const url = `http://${ip}:8080/api/entrypoint/profesionales/${uidAuth}`


    const profesionales = await fetchConTokenMethod(url, {}, 'GET');
    if(profesionales){
      return profesionales;
    }else{
      throw Error
    }
  });

  export const startLogout = createAsyncThunk(
    'auth/startLogin',
    async (data, thunkAPI) => {
      thunkAPI.dispatch(clearProfesionalActive());
      thunkAPI.dispatch(logout());

    }
  );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startCheckingFinish: (state) => {
      state.checking = false;

    },
    logout: (state) => {
      state.checking = true;
      state.uidAuth = null;
      state.name = null;
      state.profesionalesUser = [];
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('token-init-date');

    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProfesionales: (state, action) => {
      state.profesionalesUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startLogin.pending, (state) => {
        state.checking = true;
        console.log('pending');
      })
      .addCase(startLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        sessionStorage.setItem('access_token', action.payload.access_token);
        sessionStorage.setItem('token-init-date', new Date().getTime());
        state.checking = false;
        state.uidAuth = action.payload.Uid;
        state.name = action.payload.Name;
        console.log('filfilled');

      }).addCase(startLogin.rejected, (state) => {
        state.checking = true;
        state.uidAuth = null;
        state.name = null;
        state.profesionalesUser = [];
        console.log('rejected');
      })
      .addCase(startChecking.pending, (state) => {
        // state.checking = true;
        console.log('pendingToken');
      })
      .addCase(startChecking.fulfilled, (state, action) => {
        const token = sessionStorage.getItem('access_token');
        const tokenSplit = token.split('.');

        let tkUser = atob(tokenSplit[1]);
        let userJson = JSON.parse(tkUser)

        state.checking = false;
        state.uidAuth = userJson.Uid;
        state.name = userJson.Name;

        console.log('filfilledToken');

      }).addCase(startChecking.rejected, (state) => {
        state.checking = false;
        state.uidAuth = null;
        state.name = null;
        state.profesionalesUser = [];
        console.log('rejectedToken');
      }).addCase(startLoadingProfesionalList.pending, (state) => {
        console.log('proListProf');
      }).addCase(startLoadingProfesionalList.fulfilled,
        (state, action) => {
          state.profesionalesUser = action.payload
          console.log('fullFilledProf');
        }).addCase(startLoadingProfesionalList.rejected,
          (state) => {
            state.profesionalesUser = [];
            console.log('rejectedProf');
          }
        );
  },
});

export const { logout, startCheckingFinish, setProfesionales } = authSlice.actions;

export const selectAuth = (state) => state;


export default authSlice.reducer;
