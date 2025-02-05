// store/walletSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WalletState = {
    balance: 0,
    transactions: [],
    loading: false,
    error: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        addBalance: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
        },
        transferBalance: (state, action: PayloadAction<Transaction>) => {
            state.balance -= action.payload.amount;
            state.transactions.push(action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { addBalance, transferBalance, setLoading, setError } = walletSlice.actions;
export const walletReducer = walletSlice.reducer;