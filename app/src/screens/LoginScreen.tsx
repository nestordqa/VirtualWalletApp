// src/screens/LoginScreen.tsx
import React, { useCallback, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login } from '../api/authApi';
import { loginSuccess } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { routes } from '../navigation/routes';

// Esquema de validación con Yup
const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginScreen = () => {
    console.log('entrando!');
    const dispatch = useDispatch();
    const navigation = useNavigation(); // Inicializa useNavigation
    const { user, isAuthenticated, jwt } = useSelector((state: RootState) => state.auth);

    console.log(user, isAuthenticated, jwt)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema), // Integra Yup con React Hook Form
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Usa useCallback para memoizar la función onSubmit
    const onSubmit = useCallback(async (data: { email: string; password: string }) => {
        try {
          const loginRequest = await login(data.email, data.password);
          if (loginRequest && loginRequest.jwt) {
              dispatch(loginSuccess({ jwt: loginRequest.jwt, user: loginRequest.user }))
          }
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid credentials.');
        }
    }, [dispatch]); // Dependencias: dispatch

    // Usa useEffect para redirigir cuando isAuthenticated cambie
    useEffect(() => {
        if (isAuthenticated) {
            //@ts-ignore
            navigation.navigate(routes.home);
        }
    }, [isAuthenticated, navigation]); // Dependencias: isAuthenticated, navigation

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Campo de Email */}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <TextInput
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={styles.input}
                    keyboardType="email-address"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>
                )}
            />

            {/* Campo de Contraseña */}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                <View>
                    <TextInput
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    style={styles.input}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>
                )}
            />

            {/* Botón de Login */}
            <Button title="Login" onPress={handleSubmit(onSubmit)} />

            {/* Mensaje de Bienvenida */}
            {isAuthenticated && user && (
                <View style={styles.welcomeContainer}>
                <Text>Welcome, {user.email}!</Text>
                <Text>Your balance: ${user.balance}</Text>
                </View>
            )}
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  welcomeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
