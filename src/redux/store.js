import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Slices/authSlice';
import  profesionalSlice  from './features/Slices/ProfesionalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profesional: profesionalSlice
  },
});
