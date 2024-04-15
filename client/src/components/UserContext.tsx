import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
    id: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    setUserId: (userId: string) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    setUserId: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const setUserId = (userId: string) => {
        setUser(prevUser => {
            if (prevUser) {
                return { ...prevUser, id: userId };
            } else {
                return null;
            }
     });
   }

    return (
        <UserContext.Provider value={{ user, setUser, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;