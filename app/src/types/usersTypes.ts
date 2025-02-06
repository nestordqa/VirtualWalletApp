interface User {
    id: string;
    name: string;
    email: string;
    balance: number 
}

interface UserState {
    currentUser: User | null;
    users: User[]; // Lista de usuarios para transferencias
    loading: boolean;
    error: string | null;
}