/**
 * @file User Interfaces
 * @description This file defines the interfaces related to user data and state management.
 *              It includes interfaces for the `User` object and the `UserState` for Redux management.
 * @module UserInterfaces
 */

/**
 * @interface User
 * @description Interface defining the structure of a user object.
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {number} balance - The account balance of the user.
 */
interface User {
    id: string;
    name: string;
    email: string;
    balance: number;
}

/**
 * @interface UserState
 * @description Interface defining the structure of the user state for Redux management.
 * @property {User | null} currentUser - The currently logged-in user, or null if no user is logged in.
 * @property {User[]} users - A list of users, typically used for transfer operations or other user listings.
 * @property {boolean} loading - A flag indicating whether user data is currently being loaded.
 * @property {string | null} error - Any error message related to user data loading or manipulation.
 */
interface UserState {
    currentUser: User | null;
    users: User[]; // List of users for transfers
    loading: boolean;
    error: string | null;
}
