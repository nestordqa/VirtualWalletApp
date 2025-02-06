/**
 * @file WalletScreen Component
 * @description This component displays the user's wallet information, including balance and recent transactions.
 *              It fetches transaction data from the API and handles loading and error states using the `useTransactionsData` custom hook.
 * @module WalletScreen
 */

import React from 'react';
import { FlatList, StyleSheet, Alert, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routes } from '../navigation/routes';
import ReusableButton from '../components/common/Button';
import TransactionItem from '../components/transactions/TransactionItem';
import CustomText from '../components/common/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../config/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useTransactionsData } from '../hooks/useTransactionsData';

/**
 * @function WalletScreen
 * @description A functional component that renders the user's wallet information and transaction history.
 * @returns {JSX.Element} The rendered WalletScreen component.
 */
const WalletScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { jwt, user } = useSelector((state: RootState) => state.auth);

    /**
     * @hook useTransactionsData
     * @description Custom hook to fetch transactions and manage loading/error states.
     */
    const { transactions, loading, error, refetch } = useTransactionsData(jwt as string);

    /**
     * @function handleLogout
     * @description Logs the user out by removing the JWT from AsyncStorage and dispatching the logout action.
     */
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwt');
            dispatch(logout());
            //@ts-ignore
            navigation.navigate(routes.login);
        } catch (logoutError: any) {
            console.error('Error during logout:', logoutError);
            Alert.alert('Error', 'Logout failed: ' + (logoutError.message || 'Unknown error'));
        }
    };

    // Render loading indicator while data is being fetched
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
                <CustomText text="Loading transactions..." />
            </View>
        );
    }

    // Render error message if there's an error fetching transactions
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <CustomText text={error} color='red' />
                <ReusableButton text="Retry" cb={refetch} loading={loading} disabled={loading} />
            </SafeAreaView>
        );
    }

    // Render the main content when data is successfully fetched
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                {user && <CustomText size='h1' weight='bold' text={`Welcome ${user.email}`} />}
                {user && <CustomText text={`Available Balance: $${user.balance}`} color={colors.darkGrey60} />}
            </View>
            <CustomText
                text='Recent Transactions'
                size='body'
                color={colors.darkGrey60}
                style={styles.subtitle}
            />
            <FlatList
                data={transactions ?? []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionItem transaction={item} />}
                ListEmptyComponent={() => <CustomText text="No recent transactions." />}
            />
        </SafeAreaView>
    );
};

/**
 * @const styles
 * @description StyleSheet for the WalletScreen component.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    textContainer: {
        backgroundColor: colors.lightGrey50,
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(10),
        justifyContent: 'center',
        rowGap: heightPercentageToDP(1),
        borderRadius: widthPercentageToDP(5),
        // paddingHorizontal: widthPercentageToDP(5)
    },
    subtitle: {
        marginTop: 20,
        marginBottom: 10,
    },
});

export default WalletScreen;
