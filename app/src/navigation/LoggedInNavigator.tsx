/**
 * @file Router Component
 * @description This component defines the main navigation structure using a bottom tab navigator.
 *              It configures the tab bar appearance and associates screens with their respective icons and labels.
 * @module Router
 */

import React from "react";
import { Alert, Button, Platform, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP } from "react-native-responsive-screen";
import { routes } from "./routes";
import HomeScreen from "../screens/HomeScreen";
import HomeIcon from "../assets/icons/HomeIcon";
import WalletScreen from "../screens/WalletScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import ReusableButton from "../components/common/Button";
import colors from "../config/colors";
import WalletIcon from "../assets/icons/WalletIcon";
import CustomText from "../components/common/CustomText";
import TransferIcon from "../assets/icons/TransferIcon";
import BackArrowIcon from "../assets/icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import RechargeIcon from "../assets/icons/RechargeIcon";
import TransferScreen from "../screens/TransferScreen";

/**
 * @const Tab
 * @description Creates a bottom tab navigator instance.
 */
const Tab = createBottomTabNavigator();

/**
 * @function TabBarIcon
 * @description A reusable component for rendering tab bar icons.
 * @param {object} props - The component props.
 * @param {Function} props.Svg - The SVG icon component.
 * @param {string} props.color - The color of the icon.
 * @param {boolean} props.focused - Indicates whether the tab is currently focused.
 * @returns {JSX.Element} A View containing the SVG icon.
 */
const TabBarIcon = ({
    Svg,
    color,
    focused,
}: {
    Svg: ({ primaryColor }: { primaryColor?: string }) => React.ReactNode;
    color?: string;
    focused: boolean;
}) => (
    <View style={{ width: 32, height: 32, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Svg primaryColor={color}/>
    </View>
);

/**
 * @function Router
 * @description Configures and renders the bottom tab navigator with specified screens and options.
 * @returns {JSX.Element} The Tab.Navigator component with configured screens.
 */

const Router = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwt');
            dispatch(logout());
            {/* @ts-ignore */}
            navigation.navigate(routes.login);
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Logout failed.');
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarStyle: {
                    backgroundColor: colors.primaryColor,
                    height: heightPercentageToDP(10),
                    paddingTop: heightPercentageToDP(2),
                    // paddingHorizontal: 10,
                    borderTopLeftRadius: heightPercentageToDP(2),
                    borderTopRightRadius: heightPercentageToDP(2),
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                animation: 'shift'
            }}
            initialRouteName={routes.home}
        >
            <Tab.Screen
                name={routes.home}
                component={WalletScreen}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.primaryColor,
                    },
                    headerTitle: () => <CustomText color={colors.white} text="Wallet" size="h1" weight="bold"/>,
                    //@ts-ignore
                    tabBarLabel: ({ focused, color }) => {
                        return <CustomText size="body" text="Wallet" color={colors.darkGrey60}/>;
                    },
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            Svg={WalletIcon}
                            focused={focused}
                            //@ts-ignore
                            // height={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name={routes.transfer}
                component={TransferScreen}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.primaryColor,
                    },
                    headerTitle: () => <CustomText color={colors.white} text="Send Money" size="h1" weight="bold"/>,
                    //@ts-ignore
                    tabBarLabel: ({ focused, color }) => {
                        return <CustomText size="body" text="Send Money" color={colors.darkGrey60}/>;
                    },
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            Svg={TransferIcon}
                            focused={focused}
                            //@ts-ignore
                            // height={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default Router;
