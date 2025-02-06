import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { routes } from '../navigation/routes';
import ReusableButton from '../components/common/Button';
import { fetchUserTransactions } from '../api/transactionApi';
import { setTransactions } from '../store/walletSlice';
import TransactionItem from '../components/transactions/TransactionItem';
import CustomText from '../components/common/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';  // Importa SafeAreaView

const WalletScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.transactions.history);
    const { jwt, user } = useSelector((state: RootState) => state.auth); // user y jwt
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);  // Para almacenar mensajes de error

    const getTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const transactionList = await fetchUserTransactions(jwt as string);
            if (transactionList) {
                dispatch(setTransactions(transactionList));
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch transactions.');  // Almacena el mensaje de error
        } finally {
            setLoading(false);
        }
    }, [dispatch, jwt]);

    useEffect(() => {
        if (jwt) {
            getTransactions();
        } else {
            // navigation.navigate(routes.login);
        }
    }, [jwt, navigation, getTransactions]);

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
    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <CustomText text={error} color='red' />
                <ReusableButton text="Reintentar" cb={getTransactions} loading={loading} disabled={loading} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>  {/* Usa SafeAreaView */}
            <CustomText
                text='My Wallet'
                size='h2'
                weight='bold'
            />
            {user && <CustomText text={`Welcome ${user.email}`}/>}
            {user && <CustomText text={`Available Balance: $${user.balance}`}/>}
            {/* @ts-ignore */}
            <ReusableButton text="Add Balance" cb={() => navigation.navigate(routes.addBalance)} loading={loading} disabled={loading} />
            {/* @ts-ignore */}
            <ReusableButton text="Transfer Balance" cb={() => navigation.navigate(routes.transfer)} loading={loading} disabled={loading} />

            <CustomText
                text='Recent Transactions'
                size='h4'
                style={styles.subtitle}
            />
            <FlatList
                data={transactions ?? []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionItem transaction={item} />}
                ListEmptyComponent={() => <CustomText text="No recent transactions." />}
            />
            {/* <ReusableButton text="Logout" cb={handleLogout} loading={false} disabled={false} /> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    subtitle: {
        marginTop: 20,
        marginBottom: 10,
    },
    link: {
        color: '#28a745',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default WalletScreen;
