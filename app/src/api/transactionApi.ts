// src/api/transactionApi.ts
import apiClient from './apiClient';

interface Transaction {
    id: string;
    amount: number;
    date: string;
    status: 'success' | 'failed' | 'pending';
    fromUserId: string;
    toUserId: string;
}

export const createTransaction = async (receiverEmail: string, amount: number): Promise<Transaction> => {
    const response = await apiClient.post<Transaction>('/transactions', { receiverEmail, amount });
    return response.data;
};

export const fetchUserTransactions = async (): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>('/transactions');
    return response.data;
};