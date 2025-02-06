/**
 * @file Router Component
 * @description This component defines the main navigation structure using a bottom tab navigator.
 *              It configures the tab bar appearance and associates screens with their respective icons and labels.
 * @module Router
 */

import React from "react";
import { Platform, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { heightPercentageToDP } from "react-native-responsive-screen";
import { routes } from "./routes";
import HomeScreen from "../screens/HomeScreen";
import HomeIcon from "../assets/icons/HomeIcon";

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
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#ff0',
                tabBarActiveTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#b2b2b2',
                    height: heightPercentageToDP(Platform.OS === 'android' ? 10 : 11.5),
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                },
                animation: 'shift'
            }}
            initialRouteName={routes.home}
        >
            <Tab.Screen
                name={routes.home}
                component={HomeScreen}
                options={{
                    headerShown: false,
                    //@ts-ignore
                    tabBarLabel: ({ focused, color }) => {
                        return <Text>Home</Text>;
                    },
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            Svg={HomeIcon}
                            focused={focused}
                            //@ts-ignore
                            // height={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name={'routes.home'}
                component={HomeScreen}
                options={{
                    headerShown: false,
                    //@ts-ignore
                    tabBarLabel: ({ focused, color }) => {
                        return <Text>Home</Text>;
                    },
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            Svg={HomeIcon}
                            focused={focused}
                            //@ts-ignore
                            // height={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name={'routes.home2'}
                component={HomeScreen}
                options={{
                    headerShown: false,
                    //@ts-ignore
                    tabBarLabel: ({ focused, color }) => {
                        return <Text>Home</Text>;
                    },
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            Svg={HomeIcon}
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
