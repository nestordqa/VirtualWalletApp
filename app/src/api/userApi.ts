/**
 * @file userApi.ts
 * @description This file defines the API functions for managing user-related operations,
 *              including fetching user profile, loading balance, fetching all users, and creating new users.
 * @module userApi
 */

import apiClient from './apiClient';
import { isSuccess } from '../utils/handleError';

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
 * @function fetchUserProfile
 * @description Fetches the profile information for the currently logged-in user by sending a GET request to the `/users/profile` endpoint.
 * @returns {Promise<User | null>} A promise that resolves to a `User` object containing the user's profile information if the request is successful, or `null` if it fails.
 * @throws {Error} If the API request fails, an error is thrown with a descriptive message.
 */
export const fetchUserProfile = async (): Promise<User | null> => {
    try {
        const response = await apiClient.get('/users/profile');
        if (isSuccess(response.data)) {
            return response.data.data as User;
        }
        return null;
    } catch (error: any) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

/**
 * @function loadBalance
 * @description Loads balance into the user's account by sending a POST request to the `/users/load-balance` endpoint.
 * @param {number} amount - The amount to load into the account.
 * @param {string} jwt - The JSON Web Token (JWT) for authentication.
 * @returns {Promise<User | null>} A promise that resolves to a `User` object containing the updated user profile information if the request is successful, or `null` if it fails.
 * @throws {Error} If the API request fails, an error is thrown with a descriptive message.
 */
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
    } catch (error: any) {
        console.error('Error loading balance:', error);
        throw error;
    }
};

/**
 * @function fetchAllUsers
 * @description Fetches a list of all users in the system by sending a GET request to the `/users` endpoint.
 * @param {string | null} jwt - The JSON Web Token (JWT) for authentication.
 * @returns {Promise<User[] | null>} A promise that resolves to an array of `User` objects if the request is successful, or `null` if it fails.
 * @throws {Error} If the API request fails, an error is thrown with a descriptive message.
 */
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
    } catch (error: any) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

/**
 * @function postUser
 * @description Creates a new user by sending a POST request to the `/users` endpoint.
 * @param {object} data - An object containing the user's email and password.
 * @param {string} data.email - The email address of the new user.
 * @param {string} data.password - The password of the new user.
 * @returns {Promise<User | null>} A promise that resolves to a `User` object containing the newly created user's information if the request is successful, or `null` if it fails.
 * @throws {Error} If the API request fails, an error is thrown with a descriptive message.
 */
export const postUser = async (data: { email: string; password: string }): Promise<User | null> => {
    try {
        const response = await apiClient.post('/users', { ...data });
        if (isSuccess(response.data)) {
            return response.data.data as User;
        }
        return null;
    } catch (error: any) {
        console.error('Error during register:', error);
        throw error;
    }
};
