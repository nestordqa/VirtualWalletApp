/**
 * @file common.ts
 * @description This file defines common interfaces and type definitions used throughout the application.
 *              It includes interfaces for styling, icon properties, button properties, and form inputs.
 * @module common
 */
/**
 * @interface LoginFormInputs
 * @description Interface defining the structure of the login form inputs.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 */
export interface LoginFormInputs {
    email: string;
    password: string;
}

/**
 * @interface RegisterFormInputs
 * @description Interface defining the structure of the registration form inputs.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 */
export interface RegisterFormInputs {
    email: string;
    password: string;
}

/**
 * @interface ButtonProps
 * @description Interface defining the properties for the `ReusableButton` component.
 * @property {boolean} loading - Indicates whether the button is in a loading state.
 * @property {boolean} [disabled] - Indicates whether the button is disabled (optional).
 * @property {string} text - The text to display on the button.
 * @property {() => void} cb - The callback function to be executed when the button is pressed.
 * @property {any} [style] - Additional styles for the button container.
 * @property {any} [textStyle] - Additional styles for the button text.
 * @property {any} [size] - The size of the button.
 */
export interface ButtonProps {
    loading?: boolean;
    disabled?: boolean;
    text: string;
    cb: () => void;
    style?: any;
    textStyle?: any;
    size?: any;
}
