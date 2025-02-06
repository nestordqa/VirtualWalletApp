// src/api/apiClient.ts
import axios from 'axios';
import Config from 'react-native-config';
import { store } from '../store/store';
import { logout } from '../store/authSlice';

const apiClient = axios.create({
	baseURL: 'http://192.168.31.64:3000', // Usa la URL de la API desde las variables de entorno
	timeout: 10000, // Tiempo de espera para las solicitudes
	headers: {
		'Content-Type': 'application/json',
	},
});

// Interceptor para agregar el token JWT a las solicitudes
apiClient.interceptors.request.use((config) => {
	const token = store.getState().auth.jwt;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Si el token es inválido o expiró, cierra la sesión
			store.dispatch(logout());
		}
		return Promise.reject(error);
	}
);

export default apiClient;