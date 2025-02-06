/**
 * @file transactionsSlice.ts
 * @description Redux slice para gestionar el estado de las transacciones, incluyendo historial, carga y errores.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * @interface Transaction
 * @description Interfaz que define la estructura de una transacción.
 * @property {string} id - Identificador único de la transacción.
 * @property {string} senderId - ID del usuario que envía la transacción.
 * @property {string} receiverId - ID del usuario que recibe la transacción.
 * @property {number} amount - Monto de la transacción.
 * @property {string} date - Fecha de la transacción (en formato ISO string).
 * @property {string} status - Estado de la transacción ('success', 'failed', 'pending').
 */
interface Transaction {
    id: string;
    senderId: string;
    receiverId: string;
    amount: number;
    date: string;
    status: 'success' | 'failed' | 'pending';
}

/**
 * @interface TransactionsState
 * @description Interfaz que define la estructura del estado de las transacciones.
 * @property {Transaction[]} history - Array que contiene el historial de transacciones.
 * @property {boolean} loading - Indica si se están cargando las transacciones.
 * @property {string | null} error - Mensaje de error, si ocurre alguno.
 */
interface TransactionsState {
    history: Transaction[];
    loading: boolean;
    error: string | null;
}

/**
 * @const initialState
 * @description Estado inicial del slice de transacciones.
 */
const initialState: TransactionsState = {
    history: [],
    loading: false,
    error: null,
};

/**
 * @const transactionsSlice
 * @description Crea un slice de Redux para gestionar el estado de las transacciones.
 */
const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        /**
         * @function setTransactions
         * @description Reducer para establecer el historial de transacciones.
         * @param {TransactionsState} state - El estado actual de las transacciones.
         * @param {PayloadAction<Transaction[]>} action - Payload con el array de transacciones.
         */
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.history = action.payload;
            state.loading = false;
            state.error = null;
        },
        /**
         * @function addTransaction
         * @description Reducer para agregar una nueva transacción al historial.
         * @param {TransactionsState} state - El estado actual de las transacciones.
         * @param {PayloadAction<Transaction>} action - Payload con la transacción a agregar.
         */
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.history = [action.payload, ...state.history];  // Agrega la nueva transacción al inicio
        },
        /**
         * @function updateTransaction
         * @description Reducer para actualizar el estado de una transacción existente.
         * @param {TransactionsState} state - El estado actual de las transacciones.
         * @param {PayloadAction<{ id: string; status: string }>} action - Payload con el ID de la transacción y el nuevo estado.
         */
        updateTransaction: (state, action: PayloadAction<{ id: string; status: 'success' | 'failed' | 'pending' }>) => {
            const { id, status } = action.payload;
            const transaction = state.history.find((t) => t.id === id);
            if (transaction) {
                transaction.status = status;
            }
        },
        /**
         * @function setLoading
         * @description Reducer para establecer el estado de carga.
         * @param {TransactionsState} state - El estado actual de las transacciones.
         * @param {PayloadAction<boolean>} action - Payload con el estado de carga.
         */
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        /**
         * @function setError
         * @description Reducer para establecer el mensaje de error.
         * @param {TransactionsState} state - El estado actual de las transacciones.
         * @param {PayloadAction<string | null>} action - Payload con el mensaje de error.
         */
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

/**
 * @exports actions
 * @description Exporta las acciones generadas por el slice.
 */
export const {
    setTransactions,
    addTransaction,
    updateTransaction,
    setLoading,
    setError,
} = transactionsSlice.actions;

/**
 * @exports transactionsReducer
 * @description Exporta el reducer del slice.
 */
export const transactionReducer = transactionsSlice.reducer;
