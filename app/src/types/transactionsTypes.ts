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

export interface Transaction {
    id: string;
    amount: number;
    date: string;
    status: 'success' | 'failed' | 'pending';
    senderId: string;
    sender?: any,
    createdAt?: Date
}