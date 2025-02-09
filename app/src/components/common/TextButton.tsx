/**
 * @file TextButton Component
 * @description This component renders a text-based button with customizable text and color.
 *              It uses a `TouchableOpacity` to provide a clickable interface.
 * @module TextButton
 */

import React from 'react';
import colors from '../../config/colors';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import { TextButtonProps } from '../../types/components';

/**
 * @function TextButton
 * @description A reusable component for rendering a text-based button.
 * @param {object} props - The component props.
 * @param {Function} props.cb - The callback function to be executed when the button is pressed.
 * @param {string} props.text - The text to display on the button.
 * @param {string} [props.color=colors.primaryColor] - The color of the text. Defaults to `colors.primaryColor`.
 * @returns {JSX.Element} A `TouchableOpacity` containing the `CustomText` component.
 */
const TextButton = ({
    cb,
    text,
    color = colors.primaryColor
}: TextButtonProps) => {
    return (
        <TouchableOpacity onPress={cb}>
            <CustomText
                text={text}
                color={color}
                size='body'
                style={styles.link}
            />
        </TouchableOpacity>
    );
};

/**
 * @const styles
 * @description StyleSheet for the TextButton component.
 */
const styles = StyleSheet.create({
    link: {
        marginTop: 15,
        textAlign: 'center',
    },
});

export default TextButton;
