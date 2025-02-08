/**
 * @file useUserList Hook
 * @description This custom hook fetches a list of users from the API and manages loading and error states.
 * @module useUserList
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsers } from '../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

/**
 * @interface UseUserListResult
 * @description Interface for the return value of the useUserList hook.
 * @property {User[] | null} users - The list of users, or null if not yet loaded.
 * @property {boolean} loading - Indicates if the user list is currently loading.
 * @property {string | null} error - Error message, if any.
 * @property {() => void} refetch - Function to refetch the user list.
 */
interface UseUserListResult {
    users: User[] | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * @function useUserList
 * @description Fetches a list of users from the API and manages loading and error states.
 * @returns {UseUserListResult} An object containing the user list, loading state, error, and refetch function.
 */
const useUserList = (): UseUserListResult => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { jwt, user } = useSelector((state: RootState) => state.auth);


    /**
     * @function getUsers
     * @description Fetches the list of users from the API.
     */
    const getUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedUsers = await fetchAllUsers(jwt);
            if (fetchedUsers) {
                const response = fetchedUsers.filter((item) => item.id !== user?.id);
                setUsers(response);
            } else {
                setError('Failed to fetch users: User list is null.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * @hook useEffect
     * @description Fetches the users when the component mounts.
     */
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return { users, loading, error, refetch: getUsers };
};

export default useUserList;
