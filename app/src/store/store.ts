/**
 * @file store.ts
 * @description This file configures the Redux store, combining reducers from various slices.
 *              It also exports the RootState and AppDispatch types for type safety.
 * @module store
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { walletReducer } from './walletSlice';
import { userReducer } from './userSlice';

/**
 * @const store
 * @description Configures the Redux store by combining reducers from different slices.
 */
export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        user: userReducer,
        auth: authReducer,
    },
});

/**
 * @typedef RootState
 * @description Type representing the complete state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * @typedef AppDispatch
 * @description Type representing the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;
