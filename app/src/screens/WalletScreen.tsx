/**
 * @file WalletScreen Component
 * @description This component displays the user's wallet information, including balance and recent transactions.
 *              It allows the user to load balance into their account using a modal.
 * @module WalletScreen
 */

import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Alert,
    View,
    ActivityIndicator,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
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
import useLoadBalance from '../hooks/useLoadBalance';

/**
 * @function WalletScreen
 * @description A functional component that renders the user's wallet information and transaction history.
 * @returns {JSX.Element} The rendered WalletScreen component.
 */
const WalletScreen = () => {
    const navigation = useNavigation();

    /**
     * @hook useSelector
     * @description Retrieves the JWT and user information from the Redux store.
     */
    const { jwt, user } = useSelector((state: RootState) => state.auth);

    /**
     * @hook useTransactionsData
     * @description Custom hook to fetch transactions and manage loading/error states.
     */
    const { transactions, loading: transactionsLoading, error: transactionsError, refetch } = useTransactionsData(jwt as string);

    /**
     * @hook useLoadBalance
     * @description Custom hook to manage the load balance functionality.
     */
    const { loading: loadBalanceLoading, error: loadBalanceError, handleLoadBalance, clearError } = useLoadBalance();

    /**
     * @state isLoadBalanceModalVisible
     * @description State variable to control the visibility of the load balance modal.
     */
    const [isLoadBalanceModalVisible, setIsLoadBalanceModalVisible] = useState(false);

    /**
     * @state loadAmount
     * @description State variable to store the amount to load.
     */
    const [loadAmount, setLoadAmount] = useState('');

    /**
     * @function openLoadBalanceModal
     * @description Opens the load balance modal.
     */
    const openLoadBalanceModal = () => {
        setIsLoadBalanceModalVisible(true);
    };

    /**
     * @function closeLoadBalanceModal
     * @description Closes the load balance modal and clears the input.
     */
    const closeLoadBalanceModal = () => {
        setIsLoadBalanceModalVisible(false);
        setLoadAmount('');
        clearError();
    };

    /**
     * @function handleLoadBalancePress
     * @description Handles the load balance functionality.
     */
    const handleLoadBalancePress = async () => {
        try {
            const amount = parseFloat(loadAmount);

            if (isNaN(amount) || amount <= 0) {
                Alert.alert("Invalid amount", "Please enter a valid amount greater than 0");
                return;
            }

            await handleLoadBalance(amount);

            refetch();
            Alert.alert("Success", "Balance loaded successfully!");
            closeLoadBalanceModal();
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to load balance.");
        }
    };

    /**
     * @function handleLogout
     * @description Logs the user out by removing the JWT from AsyncStorage and dispatching the logout action.
     */
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwt');
            // dispatch(logout());  Removing this to prevent type checking errors. Logout button doesn't exist here anyway
            //@ts-ignore
            navigation.navigate(routes.login);
        } catch (logoutError: any) {
            console.error('Error during logout:', logoutError);
            Alert.alert('Error', 'Logout failed: ' + (logoutError.message || 'Unknown error'));
        }
    };

    // Render loading indicator while data is being fetched
    if (transactionsLoading || loadBalanceLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
                <CustomText text="Loading transactions..." />
            </View>
        );
    }

    // Render error message if there's an error fetching transactions
    if (transactionsError || loadBalanceError) {
        return (
            <SafeAreaView style={styles.container}>
                <CustomText text={transactionsError || loadBalanceError || 'There was an error'} color='red' />
                <ReusableButton text="Retry" cb={refetch} loading={transactionsLoading || loadBalanceLoading} disabled={transactionsLoading || loadBalanceLoading} />
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

            <ReusableButton text="Load Balance" cb={openLoadBalanceModal} />

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

            <Modal visible={isLoadBalanceModalVisible} animationType="slide" transparent={true}>
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <CustomText text="Enter amount to load:" />
                        <TextInput
                            style={modalStyles.input}
                            keyboardType="numeric"
                            value={loadAmount}
                            onChangeText={setLoadAmount}
                        />
                        <View style={modalStyles.buttonContainer}>
                            <ReusableButton text="Cancel" cb={closeLoadBalanceModal}/>
                            <ReusableButton text="Load" cb={handleLoadBalancePress} loading={loadBalanceLoading} disabled={loadBalanceLoading} />
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    subtitle: {
        marginTop: 20,
        marginBottom: 10,
    },
});

/**
 * @const modalStyles
 * @description StyleSheet for the modal component.
 */
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default WalletScreen;
