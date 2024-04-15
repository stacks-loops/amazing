import { createContext, useContext, useState, ReactNode} from 'react'

interface User {
    id: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}
function UserContext() {
  return (
    <div>UserContext</div>
  )
}

export default UserContext