// src/utils/userUtils.ts
export const formatUserName = (user: User): string => {
  return user.email;
};

export const filterUsersByEmail = (users: User[], searchTerm: string): User[] => {
    return users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
};