// src/components/TransactionItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText';
import colors from '../../config/colors';

interface Props {
    transaction: {
        id: string;
        senderId: string;
        receiverId: string;
        amount: number;
        date: string;
        status: 'success' | 'failed' | 'pending';
        createdAt?: Date,
        sender?: any,
        receiver?: any
    };
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
    const isIncome = transaction.receiverId === 'self';
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
                <Text style={amountStyle}>
                    {isIncome ? `+$${transaction.amount}` : `-$${transaction.amount}`}
                </Text>
                <CustomText textAlign='right' text={displayParty} size='caption' color={colors.neutralGray}/> 
                <Text style={styles.date}>{new Date(transaction.createdAt as Date).toLocaleDateString()}</Text>
            </View>
            <Text style={statusStyle}>{transaction.status}</Text>
        </View>
    );
};

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
    },
});

export default TransactionItem;
