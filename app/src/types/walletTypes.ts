/**
 * @file Wallet Interfaces
 * @description This file defines the interfaces related to wallet data and state management.
 *              It includes interfaces for the `Transaction` object and the `WalletState` for Redux management.
 * @module WalletInterfaces
 */

/**
 * @interface Transaction
 * @description Interface defining the structure of a transaction object.
 * @property {number} amount - The amount of the transaction.
 * @property {string} date - The date the transaction occurred.
 * @property {'success' | 'failed' | 'pending'} status - The status of the transaction.
 */
interface Transaction {
    amount: number;
    date: string;
    status: 'success' | 'failed' | 'pending';
}

/**
 * @interface WalletState
 * @description Interface defining the structure of the wallet state for Redux management.
 * @property {number} balance - The current balance of the wallet.
 * @property {Transaction[]} transactions - A list of transactions associated with the wallet.
 * @property {boolean} loading - A flag indicating whether wallet data is currently being loaded.
 * @property {string | null} error - Any error message related to wallet data loading or manipulation.
 */
interface WalletState {
    balance: number;
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}
