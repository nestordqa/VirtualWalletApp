import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

interface LoginFormInputs {
    email: string;
    password: string;
}

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: useMemo(() => yupResolver(loginSchema), []),
    });

    const onSubmit = useCallback(async (data: LoginFormInputs) => {
        setLoading(true);
        setError('');

        try {
            const loginRequest = await login(data.email, data.password);
            if (loginRequest && loginRequest.jwt) {
                await AsyncStorage.setItem('jwt', loginRequest.jwt);
                dispatch(loginSuccess({ jwt: loginRequest.jwt, user: loginRequest.user }));
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

    // Memoized functions for rendering TextInput components
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

    const memoizedLoginButton = useMemo(() => (
        <ReusableButton
            loading={loading}
            disabled={loading}
            text={loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            cb={handleSubmit(onSubmit)}
        />
    ), [loading, handleSubmit, onSubmit]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

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

            {memoizedLoginButton}
            <TouchableOpacity onPress={() => navigation.navigate(routes.register)}>
                <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        color: '#28a745',
        marginTop: 15,
        textAlign: 'center',
    },
});

export default LoginScreen;
