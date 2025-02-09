/**
 * @file authApi.ts
 * @description This file defines the API functions for user authentication, specifically the login functionality.
 * @module authApi
 */

import { isSuccess } from '../utils/handleError';
import apiClient from './apiClient';

/**
 * @interface LoginResponse
 * @description Interface defining the structure of the response object returned after a successful login.
 * @property {string} jwt - The JSON Web Token (JWT) for authenticating subsequent requests.
 * @property {User} user - The user object containing user information.
 */
interface LoginResponse {
    jwt: string;
    user: User;
}

/**
 * @interface User
 * @description Interface defining the structure of a user object.
 * @property {number} id - The unique identifier for the user.
 * @property {string} email - The email address of the user.
 * @property {string} name - The name of the user.
 * @property {number} balance - The account balance of the user.
 */
interface User {
    id: number;
    email: string;
    name: string;
    balance: number;
}

/**
 * @function login
 * @description Authenticates a user by sending a POST request to the `/auth/login` endpoint.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<LoginResponse | null>} A promise that resolves to a `LoginResponse` object containing the JWT and user information if the login is successful, or `null` if it fails.
 * @throws {Error} If the API request fails, an error is thrown with a descriptive message.
 */
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
    } catch (error: any) {
        console.error('Error durante el login:', error);
        throw error; // Re-lanza el error para que pueda ser manejado por el componente que llama a esta función
    }
}
