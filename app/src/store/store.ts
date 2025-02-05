// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { walletReducer } from './walletSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;