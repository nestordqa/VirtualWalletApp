import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
    loading: boolean;
    disabled?: boolean; // El ? indica que es opcional
    text: string;
    cb: () => void; // cb es de tipo función que no recibe argumentos y no retorna nada (void)
    style?: any; // Permite pasar estilos adicionales
    textStyle?: any; // Permite pasar estilos adicionales al texto
}

const ReusableButton: React.FC<Props> = ({ loading, disabled, text, cb, style, textStyle }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                style, // Aplica estilos adicionales si se proporcionan
                disabled || loading ? styles.disabledButton : {}, // Estilo para cuando el botón está deshabilitado o en loading
            ]}
            onPress={cb} // Llama al callback cuando se presiona el botón
            disabled={disabled || loading} // Deshabilita el botón si está en loading o está explícitamente deshabilitado
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" /> // Spinner de carga
            ) : (
                <Text style={[styles.buttonText, textStyle]}>{text}</Text> // Muestra el texto del botón
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#aaa', // Un color más claro para indicar que está deshabilitado
        opacity: 0.7, // Reduce la opacidad para indicar que está deshabilitado
    },
});

export default ReusableButton;
