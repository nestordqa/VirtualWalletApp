import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../navigation/routes';
import apiClient from '../api/apiClient';
import ReusableButton from '../components/common/Button';
import { postUser } from '../api/userApi';

interface RegisterFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('El email es obligatorio'),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: RegisterFormInputs) => {
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Regístrate</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                )}
                name="email"
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Contraseña"
                    secureTextEntry
                />
                )}
                name="password"
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <ReusableButton 
                loading={loading}
                disabled={loading}
                text={loading ? 'Registrando...' : 'Registrarse'}
                cb={handleSubmit(onSubmit)}
            />
            <TouchableOpacity onPress={() => navigation.navigate(routes.login)}>
                <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión</Text>
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

export default RegisterScreen;
