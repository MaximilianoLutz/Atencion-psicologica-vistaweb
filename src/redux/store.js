import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Slices/authSlice';
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer
  },
});
