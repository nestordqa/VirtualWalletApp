import React from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import { CustomTextProps } from '../../types/components';
import theme from '../../config/theme';
import colors from '../../config/colors';

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

    // Function to determine the font size based on the 'size' prop
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

    // Function to determine the font weight based on the 'weight' prop
    const getWeight = () => {
        switch (weight) {
            case 'light': return theme.fontWeight.light;
            case 'bold': return theme.fontWeight.bold;
            case 'semibold': return theme.fontWeight.semiBold;
            default: return theme.fontWeight.medium;
        }
    };

    // Function to determine the text color based on the 'color' prop
    const getColor = (): TextStyle => {
        switch (color) {
            case 'white': return theme.color.white;
            case 'primary': return theme.color.primary;
            case 'secondary': return theme.color.secondary;
            case 'neutral': return { color: colors.neutralGray };
            default: 
		    if (color) return {color: color}
            return theme.color.black
        }
    };

    // Function to determine the text decoration style
    const getDecoration = () => {
        return textDecoration === 'underline' ? theme.textDecoration.textDecorationLine.underline : theme.textDecoration.textDecorationLine.none;
    };

    // Function to determine the background color based on the 'backgroundColor' prop
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

    // Function to determine the padding based on the 'padding' prop
    const getPadding = (): ViewStyle => {
        switch (padding) {
            case 'sm': return theme.padding.sm;
            case 'mm': return theme.padding.mm;
            case 'lm': return theme.padding.lm;
            default: return theme.padding.none;
        }
    };

    // Function to determine the border radius based on the 'borderRadius' prop
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
                numberOfLines={ numberOfLines } 
                allowFontScaling
                style={[
                    getSize(), 
                    getColor(), 
                    getDecoration(), 
                    getPadding(), 
                    getWeight(), 
                    {...style, 
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
            numberOfLines={ numberOfLines } 
            allowFontScaling
            style={[
                getSize(), 
                getColor(), 
                getDecoration(), 
                getPadding(), 
                getWeight(), 
                {...style, 
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