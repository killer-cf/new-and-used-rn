import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { ReactNode, createContext, useState } from "react";


interface AuthContextData {
  user: UserDTO
  signIn: (email: string, password: string) => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { name, avatar, tel, id } = response.data.user
      
      setUser({ name, avatar, email, tel, id })
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