/**
 * @file LoginScreen Component
 * @description This component provides the user interface for the login screen,
 *              handling user input, validation, and authentication.
 * @module LoginScreen
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/authApi';
import { routes } from '../navigation/routes';
import ReusableButton from '../components/common/Button';
import CustomText from '../components/common/CustomText';
import TextButton from '../components/common/TextButton';
import colors from '../config/colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { LoginFormInputs } from '../types/common';

/**
 * @const loginSchema
 * @description Yup schema for validating the login form inputs.
 */
const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('The email is required'),
    password: yup.string().required('The password is required'),
});

/**
 * @function LoginScreen
 * @description Functional component for the login screen. It handles user input,
 *              validation, and authentication using React Hook Form and Yup for schema validation.
 * @returns {JSX.Element} The rendered LoginScreen component.
 */
const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * @hook useForm
     * @description Initializes the React Hook Form with Yup resolver for form validation.
     */
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: useMemo(() => yupResolver(loginSchema), []),
    });

    /**
     * @function onSubmit
     * @description Handles the form submission. It calls the login API, dispatches a login success action,
     *              and navigates to the home screen upon successful authentication.
     */
    const onSubmit = useCallback(async (data: LoginFormInputs) => {
        setLoading(true);
        setError('');

        try {
            const loginRequest = await login(data.email, data.password);
            if (loginRequest && loginRequest.jwt) {
                await AsyncStorage.setItem('jwt', loginRequest.jwt);
                dispatch(loginSuccess({ jwt: loginRequest.jwt, user: loginRequest.user }));
                //@ts-ignore
                navigation.navigate(routes.home);
            } else {
                setError('Login failed: No JWT received');
                Alert.alert('Error', 'No JWT received');
            }
        } catch (e: any) {
            setError(e.response?.data?.message || 'Error al iniciar sesión');
            Alert.alert('Error', e.response?.data?.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigation]);

    /**
     * @function renderEmailInput
     * @description Memoized function for rendering the email input.
     */
    const renderEmailInput = useCallback(({ field: { onChange, onBlur, value } }: any) => (
        <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
        />
    ), []);

    /**
     * @function renderPasswordInput
     * @description Memoized function for rendering the password input.
     */
    const renderPasswordInput = useCallback(({ field: { onChange, onBlur, value } }: any) => (
        <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
        />
    ), []);

    /**
     * @const memoizedLoginButton
     * @description Memoized login button to prevent unnecessary re-renders.
     */
    const memoizedLoginButton = useMemo(() => (
        <ReusableButton
            loading={loading}
            disabled={loading}
            text={loading ? 'Logging in...' : 'Login'}
            cb={handleSubmit(onSubmit)}
        />
    ), [loading, handleSubmit, onSubmit]);

    return (
        <View style={styles.container}>
            <CustomText
                text='Virtual Wallet App'
                size='h1'
                weight='bold'
                style={styles.title}
                color={colors.darkGrey60}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={renderEmailInput}
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: true }}
                    render={renderPasswordInput}
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>

            {memoizedLoginButton}

            <TextButton
                text="Don't you have an account? Sign up"
                //@ts-ignore
                cb={() => navigation.navigate(routes.register)}
            />
        </View>
    );
};

/**
 * @const styles
 * @description StyleSheet for the LoginScreen component.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colors.lightGrey50,
    },
    title: {
        marginBottom: 20,
    },
    inputContainer: {
        height: heightPercentageToDP(20),
        justifyContent: 'center',
        rowGap: heightPercentageToDP(2)
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.lightGrey50,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
