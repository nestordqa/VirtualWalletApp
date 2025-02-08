// src/api/userApi.ts
import apiClient from './apiClient';
import { isSuccess } from '../utils/handleError';

export const fetchUserProfile = async (): Promise<User | null> => {
    try {
        const response = await apiClient.get('/users/profile');
        if (isSuccess(response.data)) {
            return response.data.data as User;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const loadBalance = async (amount: number, jwt: string): Promise<User | null> => {
    try {
        const response = await apiClient.post('/users/load-balance', { amount }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (isSuccess(response.data)) {
            return response.data.data as User;
        }
        return null;
    } catch (error) {
        console.error('Error loading balance:', error);
        throw error;
    }
};

export const fetchAllUsers = async (jwt: string | null): Promise<User[] | null> => {
    try {
        const response = await apiClient.get('/users', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (isSuccess(response.data)) {
            return response.data.data as User[];
        }
        return null;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const postUser = async (data: { email: string; password: string }): Promise<User | null> => {
    try {
        const response = await apiClient.post('/users', { ...data });
        if (isSuccess(response.data)) {
            return response.data.data as User;
        }
        return null;
    } catch (error) {
        console.error('Error during register:', error);
        throw error;
    }
};
