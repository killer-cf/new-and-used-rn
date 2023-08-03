import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";
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

  function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(user)
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      const { name, avatar, tel, id } = data.user

      const user = { name, avatar, tel, id, email }
      await storageUserSave(user)
      userAndTokenUpdate(user, data.token)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData(){
    try {
      const user = await storageUserGet()
      const { token } = await storageAuthTokenGet()

      if (token && user) {
        userAndTokenUpdate(user, token)
      }
    } catch (error) {
      throw error
    }
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