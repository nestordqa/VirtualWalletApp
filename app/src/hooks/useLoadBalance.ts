/**
 * @file useLoadBalance Hook
 * @description This hook manages the logic for loading balance, including API calls, state management, and error handling.
 * @module useLoadBalance
 */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBalance } from '../api/userApi';
import { RootState } from '../store/store';
import { loginSuccess, updateUserBalance } from '../store/authSlice';

/**
 * @interface UseLoadBalanceResult
 * @description Interface defining the return type of the useLoadBalance hook.
 * @property {boolean} loading - Indicates whether the balance is currently being loaded.
 * @property {string | null} error - Any error message that occurred while loading the balance.
 * @property {(amount: number) => Promise<void>} handleLoadBalance - Function to load the balance.
 * @property {() => void} clearError - Function to clear the error message.
 */
interface UseLoadBalanceResult {
    loading: boolean;
    error: string | null;
    handleLoadBalance: (amount: number) => Promise<void>;
    clearError: () => void;
}

/**
 * @function useLoadBalance
 * @description Custom hook to manage the loading balance functionality.
 * @returns {UseLoadBalanceResult} An object containing the loading state, error message, and the handleLoadBalance function.
 */
const useLoadBalance = (): UseLoadBalanceResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { jwt } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    /**
     * @function handleLoadBalance
     * @description Loads the balance by calling the API and updating the Redux store.
     * @param {number} amount - The amount to load.
     * @returns {Promise<void>} A promise that resolves when the balance is loaded successfully or rejects if there's an error.
     */
    const handleLoadBalance = async (amount: number): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            if (jwt) {
                const loadBalanceRequest = await loadBalance(amount, jwt);
                if (loadBalanceRequest) {
                    dispatch(updateUserBalance(loadBalanceRequest.balance));
                } else {
                    setError('Failed to load balance: Updated user is null.');
                }
            } else {
                setError('JWT is missing. Please login again.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load balance.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * @function clearError
     * @description Clears the error message.
     */
    const clearError = () => {
        setError(null);
    };

    return { loading, error, handleLoadBalance, clearError };
};

export default useLoadBalance;
