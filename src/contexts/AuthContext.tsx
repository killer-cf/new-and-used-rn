import { api } from "@services/api";
import { ReactNode, createContext, useState } from "react";

type User = {
  name: string
  avatar: string
}

interface AuthContextData {
  user: User
  signIn: (email: string, password: string) => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { name, avatar } = response.data.user
      
      setUser({ name, avatar })
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}