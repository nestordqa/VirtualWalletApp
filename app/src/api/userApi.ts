// src/api/userApi.ts
import apiClient from './apiClient';

interface User {
    id: string;
    email: string;
    balance: number;
}

export const fetchUserProfile = async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/profile');
    return response.data;
};

export const loadBalance = async (amount: number): Promise<User> => {
    const response = await apiClient.post<User>('/users/load-balance', { amount });
    return response.data;
};

export const fetchAllUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
};