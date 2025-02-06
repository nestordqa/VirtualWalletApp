/**
 * @file CustomTextProps Interface
 * @description This file defines the interface for the `CustomText` component,
 *              specifying all the available props and their types.
 * @module CustomTextProps
 */

import React from "react";
import { TextStyle, ViewStyle } from "react-native";

/**
 * @interface CustomTextProps
 * @description Interface defining the properties for the `CustomText` component.
 * @property {React.ReactNode | string} [children] - Children elements to be rendered inside the text component.
 * @property {boolean} [hasBgColor] - Indicates whether the text should have a background color.
 * @property {'light' | 'medium' | 'bold' | 'semibold'} [weight] - Font weight of the text.
 * @property {'left' | 'center' | 'right' | 'justify'} [textAlign] - Text alignment.
 * @property {ViewStyle} [containerStyle] - Additional styles for the container.
 * @property {'underline' | 'none'} [textDecoration] - Text decoration style.
 * @property {'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body2' | 'caption' | 'caption2' | 'captionPlus' | 'profileName' | 'tabBarLabel' | 'button'} [size] - Size of the text.
 * @property {TextStyle} [style] - Additional styles for the text.
 * @property {string} text - Key for internationalization.
 * @property {'white' | 'primary' | 'secondary' | 'black' | 'captionGray' | 'red' | string} [color] - Color of the text.
 * @property {string} [backgroundColor] - Background color of the container.
 * @property {'sm' | 'mm' | 'lm'} [padding] - Padding for the container.
 * @property {'sm' | 'mm' | 'lm' | 'full'} [borderRadius] - Border radius for the container.
 * @property {number} [numberOfLines] - Maximum number of lines for the text.
 * @property {any} [key] - Additional props for the text component.
 * @property {VoidFunction} [onPress] - Function to be called when the text is pressed.
 */
export interface CustomTextProps {
    children?: React.ReactNode | string;
    hasBgColor?: boolean;
    weight?: 'light' | 'medium' | 'bold' | 'semibold';
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    containerStyle?: ViewStyle;
    textDecoration?: 'underline' | 'none';
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body2' | 'caption' | 'caption2' | 'captionPlus' | 'profileName' | 'tabBarLabel' | 'button';
    style?: TextStyle;
    text: string;
    color?: 'white' | 'primary' | 'secondary' | 'black' | 'captionGray' | 'red' | string;
    backgroundColor?: string;
    padding?: 'sm' | 'mm' | 'lm';
    borderRadius?: 'sm' | 'mm' | 'lm' | 'full';
    numberOfLines?: number;
    [key: string]: any;
    onPress?: VoidFunction;
}

/**
 * @interface StylesProps
 * @description Interface for extending style properties, allowing for more flexible styling.
 * @extends StyleProp<ViewStyle | TextStyle>
 */
interface StylesProps extends StyleProp<ViewStyle | TextStyle> {}


/**
 * @interface IconProps
 * @description Interface defining the properties for an icon component.
 * @property {string} [color] - The color of the icon.
 * @property {string | number} [width] - The width of the icon.
 * @property {string | number} [height] - The height of the icon.
 * @property {string} [primaryColor] - The primary color of the icon.
 * @property {any} [otherProps] - Additional properties for the icon.
 * @property {boolean} [showRedDot] - Whether to show a red dot on the icon.
 * @property {StylesProps} [style] - Additional styles for the icon.
 */
export interface IconProps {
    color?: string;
    width?: string | number;
    height?: string | number;
    primaryColor?: string;
    otherProps?: any;
    showRedDot?: boolean;
    style?: StylesProps;
}

/**
 * @interface TextButtonProps
 * @description Interface defining the properties for a text button component.
 * @property {VoidFunction} cb - The callback function to be executed when the button is pressed.
 * @property {string} text - The text to display on the button.
 * @property {string} [color] - The color of the text.
 */
export interface TextButtonProps {
    cb: VoidFunction;
    text: string;
    color?: string;
}