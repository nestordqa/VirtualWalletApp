/**
 * @file useTransactionsData Hook
 * @description This custom hook is responsible for fetching user transaction data from the API,
 *              managing the loading state, handling errors, and providing a function to refetch the data.
 * @module useTransactionsData
 */

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "../api/transactionApi";
import { setTransactions } from "../store/walletSlice";
import { RootState } from "../store/store";

/**
 * @function useTransactionsData
 * @description Custom hook to fetch user transactions and manage loading and error states.
 * @param {string} jwt - The JSON Web Token (JWT) for authentication.
 * @returns {object} An object containing transactions, loading state, error, and a refetch function.
 */
export const useTransactionsData = (jwt: string) => {
    const dispatch = useDispatch();

    /**
     * @state loading
     * @description State variable to indicate if the transaction data is currently being loaded.
     */
    const [loading, setLoading] = useState(true);

    /**
     * @state error
     * @description State variable to store any error message that occurs during the transaction fetching process.
     */
    const [error, setError] = useState<string | null>(null);

    /**
     * @hook useSelector
     * @description Retrieves the transaction history from the Redux store.
     */
    const transactions = useSelector((state: RootState) => state.transactions.history);

    /**
     * @function getTransactions
     * @description Fetches the transaction data from the API and updates the Redux store.
     */
    const getTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const transactionList = await fetchUserTransactions(jwt as string);
            if (transactionList) {
                dispatch(setTransactions(transactionList));
            } else {
                setError('Failed to fetch transactions: Transaction list is null.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch transactions.');
        } finally {
            setLoading(false);
        }
    }, [dispatch, jwt]);

    /**
     * @hook useEffect
     * @description Fetches the transaction data when the component mounts and when the JWT changes.
     */
    useEffect(() => {
        if (jwt) {
            getTransactions();
        }
    }, [jwt, getTransactions]);

    return { transactions, loading, error, refetch: getTransactions };
};
