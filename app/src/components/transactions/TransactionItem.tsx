// src/components/TransactionItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText';
import colors from '../../config/colors';

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
                <CustomText style={amountStyle} text={isIncome ? `+$${transaction.amount}` : `-$${transaction.amount}`} textAlign='left'/>
                <CustomText textAlign='right' text={displayParty} size='caption' color={colors.neutralGray}/> 
                <CustomText style={styles.date} text={new Date(transaction.createdAt as Date).toLocaleDateString()} textAlign='left'/>
            </View>
            <CustomText style={statusStyle} text={transaction.status}/>
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
        textTransform: 'capitalize',
    },
});

export default TransactionItem;
