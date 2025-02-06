/**
 * @file AppNavigator Component
 * @description This component sets up the main navigation structure for the application
 *              using a stack navigator. It defines the screens and their transitions.
 * @module AppNavigator
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import { routes } from './routes';
import RegisterScreen from '../screens/RegisterScreen';
import LoggedInNavigation from './LoggedInNavigator';

/**
 * @const Stack
 * @description Creates a stack navigator instance for handling screen transitions.
 */
const Stack = createNativeStackNavigator();

/**
 * @function AppNavigator
 * @description Configures and renders the main application navigator.
 *              It defines the screens and their order in the navigation stack.
 * @returns {JSX.Element} The NavigationContainer with configured Stack.Navigator.
 */
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={routes.login}
            >
                <Stack.Screen name={routes.login} component={LoginScreen} />
                <Stack.Screen name={routes.register} component={RegisterScreen} />
                <Stack.Screen name={routes.home} component={LoggedInNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
