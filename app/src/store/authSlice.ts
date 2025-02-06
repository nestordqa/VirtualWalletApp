// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
    balance: number;
}

interface AuthState {
    jwt: string | null;
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean,
    error: any
}

const initialState: AuthState = {
    jwt: null,
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ jwt: string; user: User }>) => {
            state.jwt = action.payload.jwt;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.jwt = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        updateUserBalance: (state, action: PayloadAction<number>) => {
            if (state.user) {
                state.user.balance = action.payload;
            }
        },
    },
});

export const { loginSuccess, logout, updateUserBalance } = authSlice.actions;
export default authSlice.reducer;