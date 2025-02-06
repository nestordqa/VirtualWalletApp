/**
 * @file ReusableButton Component
 * @description This component renders a customizable button with loading and disabled states.
 *              It uses a `TouchableOpacity` to provide a clickable interface with text and an optional loading indicator.
 * @module ReusableButton
 */

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../config/colors';
import { ButtonProps } from '../../types/common';

/**
 * @function ReusableButton
 * @description A reusable component for rendering a customizable button.
 * @param {Props} props - The component props.
 * @returns {JSX.Element} A `TouchableOpacity` with either an `ActivityIndicator` (loading) or text.
 */
const ReusableButton: React.FC<ButtonProps> = ({
    loading,
    disabled,
    text,
    cb,
    style,
    textStyle,
    size = '100%'
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                size,
                style,
                disabled || loading ? styles.disabledButton : {},
            ]}
            onPress={cb}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={[styles.buttonText, textStyle]}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};

/**
 * @const styles
 * @description StyleSheet for the ReusableButton component.
 */
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primaryColor,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#aaa',
        opacity: 0.7,
    },
});

export default ReusableButton;
