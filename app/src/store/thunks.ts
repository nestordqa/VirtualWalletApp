// src/store/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi';
import { RootState } from './store';

// Define el thunk para el login
export const loginThunk = createAsyncThunk(
  'auth/login', // Nombre de la acción
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
        console.log(credentials, 'DESDE THUNK!')
      // Llama a la API para iniciar sesión
      const { token, user } = await login(credentials.email, credentials.password);
      return { token, user }; // Devuelve los datos al reducer
    } catch (error) {
      return rejectWithValue(error); // Maneja errores
    }
  }
);