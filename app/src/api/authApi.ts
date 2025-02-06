// src/api/authApi.ts
import { isSuccess } from '../utils/handleError';
import apiClient from './apiClient';

interface LoginResponse {
    jwt: string;
    user: User
}

// En authApi.ts
export const login = async (email: string, password: string): Promise<LoginResponse | null> => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        if (isSuccess(response.data)) {
            const data = response.data.data;
            return {
                jwt: data.access_token,
                user: data.user
            };
        }
        return null;
    } catch (error) {
        console.error('Error durante el login:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el componente que llama a esta función
    }
}
