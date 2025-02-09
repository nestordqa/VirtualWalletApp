/**
 * @file TransactionItem.tsx
 * @description This component displays the details of a single transaction.
 * @module TransactionItem
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText';
import colors from '../../config/colors';

/**
 * @interface Props
 * @description Defines the props for the TransactionItem component.
 * @property {object} transaction - The transaction object.
 * @property {number} transaction.id - The unique identifier for the transaction.
 * @property {string} [transaction.senderId] - The ID of the sender.
 * @property {string} [transaction.receiverId] - The ID of the receiver.
 * @property {number} transaction.amount - The amount of the transaction.
 * @property {string} transaction.date - The date of the transaction.
 * @property {'success' | 'failed' | 'pending'} transaction.status - The status of the transaction.
 * @property {Date} [transaction.createdAt] - The creation date of the transaction.
 * @property {any} [transaction.sender] - The sender object.
 * @property {any} [transaction.receiver] - The receiver object.
 * @property {object} user - The user object.
 */
interface Props {
    transaction: {
        id: number;
        senderId?: string;
        receiverId?: string;
        amount: number;
        date: string;
        status: 'success' | 'failed' | 'pending';
        createdAt?: Date,
        sender?: any,
        receiver?: any
    };
    user: User
}

/**
 * @interface User
 * @description Defines the structure of a user object.
 * @property {number} id - The unique identifier for the user.
 * @property {string} email - The email address of the user.
 * @property {string} name - The name of the user.
 * @property {number} balance - The account balance of the user.
 */
interface User {
    id: number;
    email: string;
    name: string;
    balance: number;
}

/**
 * @function TransactionItem
 * @description Displays the details of a single transaction, including the amount, sender/receiver, date, and status.
 * @param {Props} props - The props for the component.
 * @returns {JSX.Element} The rendered TransactionItem component.
 */
const TransactionItem: React.FC<Props> = ({ transaction, user }) => {
    const isIncome = user?.email !== transaction.sender?.email;
    const displayParty = isIncome ? `Received from: ${transaction.sender.email}` : `Sent to ${transaction.receiver.email}`; // Obtener el nombre del remitente o destinatario

    const statusColor =
        transaction.status === 'success' ? 'green' :
            transaction.status === 'failed' ? 'red' : 'gray';

    const amountStyle = {
        ...styles.amount,
        color: isIncome ? 'green' : 'red', // Estilo condicional
    };

    const statusStyle = {
        ...styles.status,
        color: statusColor, // Estilo condicional
    };

    return (
        <View style={styles.container}>
            <View style={styles.details}>
                <CustomText style={amountStyle} text={isIncome ? `+$${transaction.amount}` : `-$${transaction.amount}`} textAlign='left' />
                <CustomText textAlign='right' text={displayParty} size='caption' color={colors.neutralGray} />
                <CustomText style={styles.date} text={new Date(transaction.createdAt as Date).toLocaleDateString()} textAlign='left' />
            </View>
            <CustomText style={statusStyle} text={transaction.status} />
        </View>
    );
};

/**
 * @const styles
 * @description StyleSheet for the TransactionItem component.
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    details: {
        flexDirection: 'column',
    },
    amount: {  // Estilo base
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    status: {  // Estilo base
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});

export default TransactionItem;
