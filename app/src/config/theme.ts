/**
 * @file theme.ts
 * @description This file defines the application's theme, including font sizes, font weights,
 *              colors, text decorations, text alignments, background colors, padding, and border radius styles.
 * @module theme
 */

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from './colors';

/**
 * @const fontSize
 * @description Defines font sizes for various text styles.
 */
const fontSize = {
    h1: { fontSize: wp(6.3) },
    h2: { fontSize: wp(5.1) },
    h3: { fontSize: wp(4.1) },
    h4: { fontSize: wp(3.6) },
    body: { fontSize: wp(4.1) },
    body2: { fontSize: wp(4) },
    caption: { fontSize: wp(3.05) },
    caption2: { fontSize: wp(3.05) },
    captionPlus: { fontSize: 11 },
    profileName: { fontSize: 22 },
    tabBarLabel: { fontSize: 12 },
    button: { fontSize: 16 },
};

/**
 * @const fontWeight
 * @description Defines font weights for various text styles.
 */
const fontWeight = {
    light: { fontWeight: '300' },
    medium: { fontWeight: '500' },
    semiBold: { fontWeight: '600' },
    bold: { fontWeight: '700' },
};

/**
 * @const color
 * @description Defines colors for various text styles.
 */
const color = {
    white: { color: '#FFFFFF' },
    primary: { color: colors.primaryColor },
    secondary: { color: '#2ecc71' },
    black: { color: '#000000' },
    transparent: { color: 'transparent' },
    primaryPressed: { color: '#2ecc71' },
    //@ts-ignore
};

/**
 * @const textDecoration
 * @description Defines text decoration styles.
 */
const textDecoration = {
    textDecorationLine: {
        underline: { textDecorationLine: 'underline' },
        none: { textDecorationLine: 'none' },
    },
};

/**
 * @const textAlign
 * @description Defines text alignment styles.
 */
const textAlign = {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    justify: { textAlign: 'justify' },
    auto: { textAlign: 'auto' },
};

/**
 * @const backgroundColor
 * @description Defines background colors for various components.
 */
const backgroundColor = {
    none: { backgroundColor: 'transparent' },
    background: { backgroundColor: '#F9F9F9' },
    hobeenGreen: { backgroundColor: '#2ecc71' },
    primary: { backgroundColor: colors.primaryColor },
    secondary: { backgroundColor: '#2ecc71' },
    danger: { backgroundColor: '#e74c3c' },
    gray: { backgroundColor: '#95a5a6' },
    yellow: { backgroundColor: '#f1c40f' },
    primary3: { backgroundColor: '#2980b9' },
};

/**
 * @const padding
 * @description Defines padding styles for various components.
 */
const padding = {
    none: { padding: 0 },
    sm: { padding: 5 },
    mm: { padding: 10 },
    lm: { padding: 15 },
};

/**
 * @const border
 * @description Defines border radius styles for various components.
 */
const border = {
    radius: {
        sm: { borderRadius: 5 },
        mm: { borderRadius: 10 },
        lm: { borderRadius: 15 },
        full: { borderRadius: 50 },
    },
};

/**
 * @const theme
 * @description Aggregates all theme properties into a single object.
 */
const theme = {
    fontSize,
    fontWeight,
    color,
    fontFamily: 'DM Sans',
    textDecoration,
    textAlign,
    backgroundColor,
    padding,
    border,
    flex: {
        alignItems: {
            center: { alignItems: 'center' },
        },
    },
};

export default theme;
