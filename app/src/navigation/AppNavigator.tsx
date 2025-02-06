import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import { routes } from './routes';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator