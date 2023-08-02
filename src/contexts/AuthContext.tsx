import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenRemove } from "@storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";


interface AuthContextData {
  user: UserDTO
  signIn: (email: string, password: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO)

  async function signOut() {
    try {
      await storageUserRemove()
      await storageAuthTokenRemove()
      setUser({} as UserDTO)
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      const { name, avatar, tel, id } = data.user

      const user = { name, avatar, tel, id, email }
      await storageUserSave(user)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      setUser(user)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData(){
    const user = await storageUserGet()
    setUser(user)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}