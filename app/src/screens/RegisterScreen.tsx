/**
 * @file RegisterScreen Component
 * @description This component provides the user interface for the registration screen,
 *              handling user input, validation, and registration of new users.
 * @module RegisterScreen
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../navigation/routes';
import ReusableButton from '../components/common/Button';
import CustomText from '../components/common/CustomText';
import TextButton from '../components/common/TextButton';
import colors from '../config/colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { postUser } from '../api/userApi';
import { RegisterFormInputs } from '../types/common';

/**
 * @const schema
 * @description Yup schema for validating the registration form inputs.
 */
const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('The email is required'),
    password: yup.string().min(6, 'You must put 6 characters at least').required('The password is required'),
});

/**
 * @function RegisterScreen
 * @description Functional component for the registration screen. It handles user input,
 *              validation, and registration using React Hook Form and Yup for schema validation.
 * @returns {JSX.Element} The rendered RegisterScreen component.
 */
const RegisterScreen = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * @hook useForm
     * @description Initializes the React Hook Form with Yup resolver for form validation.
     */
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: useMemo(() => yupResolver(schema), []),
    });

    /**
     * @function onSubmit
     * @description Handles the form submission. It calls the registration API,
     *              and navigates to the login screen upon successful registration.
     */
    const onSubmit = useCallback(async (data: RegisterFormInputs) => {
        setLoading(true);
        setError('');

        try {
            const registerRequest = await postUser(data);
            if (registerRequest) {
                //@ts-ignore
                navigation.navigate(routes.login);
            }
        } catch (e: any) {
            setError(e.response?.data?.message || 'Error al registrarse');
            Alert.alert('Error', e.response?.data?.message || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    }, [navigation]);

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
     * @const memoizedRegisterButton
     * @description Memoized register button to prevent unnecessary re-renders.
     */
    const memoizedRegisterButton = useMemo(() => (
        <ReusableButton
            loading={loading}
            disabled={loading}
            text={loading ? 'Creating account...' : 'Create account'}
            cb={handleSubmit(onSubmit)}
        />
    ), [loading, handleSubmit, onSubmit]);

    return (
        <View style={styles.container}>
            <CustomText
                text='Sign up'
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

            {memoizedRegisterButton}

            <TextButton
                text='Already have an account? Login'
                //@ts-ignore
                cb={() => navigation.navigate(routes.login)}
            />
        </View>
    );
};

/**
 * @const styles
 * @description StyleSheet for the RegisterScreen component.
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

export default RegisterScreen;
