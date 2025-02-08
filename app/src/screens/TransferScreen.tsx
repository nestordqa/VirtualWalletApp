/**
 * @file TransferScreen Component
 * @description This component displays a list of users and allows the user to select a recipient and enter an amount to transfer.
 * @module TransferScreen
 */

import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../components/common/CustomText';
import colors from '../config/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ReusableButton from '../components/common/Button';
import useUserList from '../hooks/useUsersList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { createTransaction } from '../api/transactionApi';
import { updateUserBalance } from '../store/authSlice';
import { addTransaction } from '../store/walletSlice';

/**
 * @interface User
 * @description Interface defining the structure of a user object.
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {number} balance - The account balance of the user.
 */
interface User {
    id: string;
    name: string;
    email: string;
    balance: number;
}

/**
 * @function TransferScreen
 * @description A functional component that renders a list of users and allows the user to select a recipient and enter an amount to transfer.
 * @returns {JSX.Element} The rendered TransferScreen component.
 */
const TransferScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { users, loading, error, refetch } = useUserList();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [transferAmount, setTransferAmount] = useState('');
    const [isTransferring, setIsTransferring] = useState(false);
    const { jwt, user } = useSelector((state: RootState) => state.auth); // Obtener el JWT
    //Balance section
    const currentBalance = user?.balance ?? 0;

    /**
     * @function handleUserSelect
     * @description Handles the selection of a user from the list.
     * @param {User} user - The selected user.
     */
    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    /**
     * @function handleTransfer
     * @description Handles the transfer of funds to the selected user.
     */
    const handleTransfer = async () => {
        if (!selectedUser) {
            Alert.alert('Error', 'Please select a recipient.');
            return;
        }

        const amount = parseFloat(transferAmount);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Error', 'Please enter a valid amount greater than 0.');
            return;
        }
        if (amount > currentBalance) {
            Alert.alert("Error", "Insufficient funds");
            return;
        }

        Alert.alert('Transfer Confirmation', `Transfer $${amount} to ${selectedUser.email}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Confirm',
                onPress: async () => {
                    setIsTransferring(true);
                    try {
                        const transaction = await createTransaction(selectedUser.email, amount, jwt as string);
                        if (transaction) {
                            Alert.alert(transaction.status.toUpperCase(), `${transaction.status.toUpperCase()} transference $${amount} to ${selectedUser.email}`);
                            // Reset state
                            setTransferAmount('');
                            setSelectedUser(null);
                            if (transaction.status === 'success') {
                                dispatch(updateUserBalance(transaction.sender.balance - (transaction.amount)));
                            }
                            dispatch(addTransaction(transaction))
                            navigation.goBack(); // Navigate back to WalletScreen
                        } else {
                            Alert.alert('Error', 'Failed to create transaction.');
                        }
                    } catch (transferError: any) {
                        console.error('Error during transfer:', transferError);
                        Alert.alert('Error', transferError.message || 'Transfer failed.');
                    } finally {
                        setIsTransferring(false);
                    }
                },
            },
        ]);
    };

    // Render loading indicator while data is being fetched
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
                <CustomText text="Loading users..." />
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
            {/* Current Balance Card */}
            <View style={styles.balanceContainer}>
                <CustomText size="body" weight="bold" text="Current Balance:" />
                <CustomText size="h3" color={colors.primaryColor} text={`$${currentBalance}`} />
            </View>

            <CustomText size="h2" weight="bold" style={styles.title} text="Select the user who receives:" />

            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.userItem,
                            selectedUser?.id === item.id && styles.selectedUserItem,
                        ]}
                        onPress={() => handleUserSelect(item)}
                    >
                        <CustomText text={item.email} textAlign='left'/>
                    </TouchableOpacity>
                )}
            />

            {selectedUser && (
                <View style={styles.transferSection}>
                    <CustomText text={`Selected user: ${selectedUser.email}`} style={styles.selectedRecipientText} />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter amount to transfer"
                        value={transferAmount}
                        onChangeText={setTransferAmount}
                    />
                    <ReusableButton
                        text="Transfer"
                        cb={handleTransfer}
                        loading={isTransferring} // Loading state para el boton
                        disabled={isTransferring} // Deshabilitar durante la transferencia
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

/**
 * @const styles
 * @description StyleSheet for the TransferScreen component.
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
    userItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey50,
    },
    selectedUserItem: {
        backgroundColor: colors.lightGrey50,
    },
    transferSection: {
        marginTop: 20,
    },
    selectedRecipientText: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: colors.neutralGray,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    //Added this style
    balanceContainer: {
        backgroundColor: colors.lightGrey50,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
});

export default TransferScreen;
