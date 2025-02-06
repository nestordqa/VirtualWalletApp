// src/api/apiClient.ts
import axios from 'axios';
import Config from 'react-native-config';
import { store } from '../store/store';
import { logout } from '../store/authSlice';
import constants from '../config/constants';

const apiClient = axios.create({
	baseURL: constants.API_URL, // Usa la URL de la API desde las variables de entorno
	timeout: 10000, // Tiempo de espera para las solicitudes
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;