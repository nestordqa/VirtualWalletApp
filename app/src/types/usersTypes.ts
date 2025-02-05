interface User {
    id: string;
    name: string;
    email: string;
}

interface UserState {
    currentUser: User | null;
    users: User[]; // Lista de usuarios para transferencias
    loading: boolean;
    error: string | null;
}