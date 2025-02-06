// src/utils/authUtils.ts
import { logout } from '../store/authSlice';
import { store } from '../store/store';

export const checkAuth = (): boolean => {
    const token = store.getState().auth.jwt;
    return !!token;
};

export const handleLogout = () => {
    store.dispatch(logout());
};