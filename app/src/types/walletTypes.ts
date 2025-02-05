interface Transaction {
    amount: number;
    date: string;
    status: 'success' | 'failed' | 'pending';
}  

interface WalletState {
    balance: number;
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}