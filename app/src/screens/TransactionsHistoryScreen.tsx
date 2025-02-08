/**
 * @file TransactionHistoryScreen Component
 * @description This component displays a list of the user's transaction history.
 *              It uses the useTransactionsData hook to fetch and manage transaction data.
 * @module TransactionHistoryScreen
 */

import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../config/colors';
import { useTransactionsData } from '../hooks/useTransactionsData';
import CustomText from '../components/common/CustomText';
import ReusableButton from '../components/common/Button';
import TransactionItem from '../components/transactions/TransactionItem';

/**
 * @function TransactionHistoryScreen
 * @description Renders a list of the user's transaction history.
 * @returns {JSX.Element} The rendered TransactionHistoryScreen component.
 */
const TransactionHistoryScreen = () => {
    const { jwt, user } = useSelector((state: RootState) => state.auth); // Get JWT and User
    const { transactions, loading, error, refetch } = useTransactionsData(jwt as string);

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

    return (
        <SafeAreaView style={styles.container}>
            <CustomText size="h2" weight="bold" style={styles.title} text="Transaction History" />
            <FlatList
                data={transactions ?? []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionItem transaction={item} key={user?.id} />}
                ListEmptyComponent={() => <CustomText text="No transactions found." />}
            />
        </SafeAreaView>
    );
};

/**
 * @const styles
 * @description StyleSheet for the TransactionHistoryScreen component.
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
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default TransactionHistoryScreen;
