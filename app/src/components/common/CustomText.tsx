/**
 * @file CustomText.tsx
 * @description A versatile text component with customizable styles.
 * @module CustomText
 */

import React from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import { CustomTextProps } from '../../types/components';
import theme from '../../config/theme';
import colors from '../../config/colors';

/**
 * @interface CustomTextProps
 * @description Defines the props for the CustomText component.
 * @property {boolean} [hasBgColor] - Determines if the text has a background color.
 * @property {'light' | 'medium' | 'semibold' | 'bold'} [weight='medium'] - Font weight.
 * @property {'left' | 'center' | 'right'} [textAlign] - Text alignment.
 * @property {ViewStyle} [containerStyle] - Style for the container (if hasBgColor is true).
 * @property {'none' | 'underline'} [textDecoration] - Text decoration.
 * @property {'body' | 'body2' | 'caption' | 'caption2' | 'captionPlus' | 'h4' | 'h3' | 'h2' | 'h1' | 'profileName' | 'tabBarLabel' | 'button'} [size='h3'] - Font size.
 * @property {TextStyle} [style] - Additional text styles.
 * @property {string} text - The text to display.
 * @property {'white' | 'primary' | 'secondary' | 'neutral' | string} [color] - Text color.
 * @property {'primary' | 'secondary' | string} [backgroundColor] - Background color.
 * @property {'none' | 'sm' | 'mm' | 'lm'} [padding] - Padding size.
 * @property {'sm' | 'mm' | 'lm' | 'full'} [borderRadius] - Border radius size.
 * @property {number} [numberOfLines] - Maximum number of lines.
 */

/**
 * @function CustomText
 * @description A highly customizable text component that allows setting various styles,
 *              including font size, weight, color, background color, text decoration, and more.
 * @param {CustomTextProps} props - The props for the component.
 * @returns {JSX.Element} The rendered CustomText component.
 */
const CustomText: React.FC<CustomTextProps> = ({
    hasBgColor,
    weight = 'medium',
    textAlign,
    containerStyle,
    textDecoration,
    size = 'h3',
    style,
    text,
    color,
    backgroundColor,
    padding,
    borderRadius,
    numberOfLines
}) => {

    /**
     * @function getSize
     * @description Determines the font size based on the 'size' prop.
     * @returns {TextStyle} Font size style.
     */
    const getSize = (): TextStyle => {
        switch (size) {
            case 'body': return theme.fontSize.body;
            case 'body2': return theme.fontSize.body2;
            case 'caption': return theme.fontSize.caption;
            case 'caption2': return theme.fontSize.caption2;
            case 'captionPlus': return theme.fontSize.captionPlus;
            case 'h4': return theme.fontSize.h4;
            case 'h3': return theme.fontSize.h3;
            case 'h2': return theme.fontSize.h2;
            case 'h1': return theme.fontSize.h1;
            case 'profileName': return theme.fontSize.profileName;
            case 'tabBarLabel': return theme.fontSize.tabBarLabel;
            case 'button': return theme.fontSize.button;
            default: return theme.fontSize.h4;
        }
    };

    /**
     * @function getWeight
     * @description Determines the font weight based on the 'weight' prop.
     * @returns {string} Font weight value.
     */
    const getWeight = () => {
        switch (weight) {
            case 'light': return theme.fontWeight.light;
            case 'bold': return theme.fontWeight.bold;
            case 'semibold': return theme.fontWeight.semiBold;
            default: return theme.fontWeight.medium;
        }
    };

    /**
     * @function getColor
     * @description Determines the text color based on the 'color' prop.
     * @returns {TextStyle} Text color style.
     */
    const getColor = (): TextStyle => {
        switch (color) {
            case 'white': return theme.color.white;
            case 'primary': return theme.color.primary;
            case 'secondary': return theme.color.secondary;
            case 'neutral': return { color: colors.neutralGray };
            default:
                if (color) return { color: color }
                return theme.color.black
        }
    };

    /**
     * @function getDecoration
     * @description Determines the text decoration style based on the 'textDecoration' prop.
     * @returns {string} Text decoration value.
     */
    const getDecoration = () => {
        return textDecoration === 'underline' ? theme.textDecoration.textDecorationLine.underline : theme.textDecoration.textDecorationLine.none;
    };

    /**
     * @function getBackgroundColor
     * @description Determines the background color based on the 'backgroundColor' prop.
     * @returns {ViewStyle} Background color style.
     */
    const getBackgroundColor = (): ViewStyle => {
        if (hasBgColor) {
            switch (backgroundColor) {
                case 'primary': return theme.backgroundColor.primary;
                case 'secondary': return theme.backgroundColor.secondary;
                default: return { backgroundColor: backgroundColor };
            }
        }
        return theme.backgroundColor.none;
    };

    /**
     * @function getPadding
     * @description Determines the padding based on the 'padding' prop.
     * @returns {ViewStyle} Padding style.
     */
    const getPadding = (): ViewStyle => {
        switch (padding) {
            case 'sm': return theme.padding.sm;
            case 'mm': return theme.padding.mm;
            case 'lm': return theme.padding.lm;
            default: return theme.padding.none;
        }
    };

    /**
     * @function getBorderRadius
     * @description Determines the border radius based on the 'borderRadius' prop.
     * @returns {ViewStyle} Border radius style.
     */
    const getBorderRadius = (): ViewStyle => {
        switch (borderRadius) {
            case 'sm': return theme.border.radius.sm;
            case 'mm': return theme.border.radius.mm;
            case 'lm': return theme.border.radius.lm;
            case 'full': return theme.border.radius.full;
            default: return {};
        }
    };

    // Render the component with or without a background based on 'hasBgColor'
    return hasBgColor ? (
        <View
            style={[
                getBackgroundColor(),
                getBorderRadius(),
                //@ts-ignore
                theme.flex.alignItems.center,
                {
                    paddingVertical: 5
                },
                containerStyle
            ]}
        >
            {/*@ts-ignore */}
            <Text
                numberOfLines={numberOfLines}
                allowFontScaling
                style={[
                    getSize(),
                    getColor(),
                    getDecoration(),
                    getPadding(),
                    getWeight(),
                    {
                        ...style,
                        fontFamily: theme.fontFamily,
                        textAlign: textAlign || 'center'
                    }
                ]}
            >
                {text}
            </Text>
        </View>
    ) : (
        // @ts-ignore
        <Text
            numberOfLines={numberOfLines}
            allowFontScaling
            style={[
                getSize(),
                getColor(),
                getDecoration(),
                getPadding(),
                getWeight(),
                {
                    ...style,
                    fontFamily: theme.fontFamily,
                    textAlign: textAlign || 'center'
                }
            ]}
        >
            {text}
        </Text>
    );
};

export default CustomText;
