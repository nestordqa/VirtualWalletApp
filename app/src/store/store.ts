// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Importa el slice de autenticación
import { walletReducer } from './walletSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        user: userReducer,
        auth: authReducer, // Registra el slice de autenticación
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;