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
    setUser({
      name: 'kilder',
      avatar: 'oioi',
    })
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}