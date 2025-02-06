/**
 * @file transactionApi.ts
 * @description This file defines the API functions for managing transactions,
 *              including creating new transactions and fetching user transactions.
 * @module transactionApi
 */

import apiClient from './apiClient';
import { isSuccess } from '../utils/handleError';

/**
 * @interface Transaction
 * @description Interface defining the structure of a transaction object.
 * @property {string} id - The unique identifier for the transaction.
 * @property {number} amount - The amount of the transaction.
 * @property {string} date - The date the transaction occurred.
 * @property {'success' | 'failed' | 'pending'} status - The status of the transaction.
 * @property {string} senderId - The ID of the sender.
 * @property {string} receiverId - The ID of the receiver.
 */
interface Transaction {
    id: string;
    amount: number;
    date: string;
    status: 'success' | 'failed' | 'pending';
    senderId: string;
    receiverId: string;
}

/**
 * @function createTransaction
 * @description Creates a new transaction by sending a POST request to the API.
 * @param {string} receiverEmail - The email address of the receiver.
 * @param {number} amount - The amount to transfer.
 * @returns {Promise<Transaction | null>} A promise that resolves to the created transaction or null if there was an error.
 * @throws {Error} If the API request fails.
 */
export const createTransaction = async (receiverEmail: string, amount: number): Promise<Transaction | null> => {
    try {
        const response = await apiClient.post('/transactions', { receiverEmail, amount });
        if (isSuccess(response.data)) {
            return response.data.data as Transaction;
        }
        return null;
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
};

/**
 * @function fetchUserTransactions
 * @description Fetches the transactions for a user by sending a GET request to the API.
 * @param {string} jwt - The JSON Web Token (JWT) for authentication.
 * @returns {Promise<Transaction[] | null>} A promise that resolves to an array of transactions or null if there was an error.
 * @throws {Error} If the API request fails.
 */
export const fetchUserTransactions = async (jwt: string): Promise<Transaction[] | null> => {
    try {
        const response = await apiClient.get('/transactions', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (isSuccess(response.data)) {
            return response.data.data as Transaction[];
        }
        return null;
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        throw error;
    }
};
