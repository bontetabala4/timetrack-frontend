import { createContext, useEffect, useMemo, useState } from 'react'
import type { AuthUser, LoginPayload } from '../data/auth'
import { fakeLogin } from '../data/auth'

type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<AuthUser>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = 'timetrack_auth_user'

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as AuthUser
        setUser(parsedUser)
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  }, [])

  const login = async (payload: LoginPayload) => {
    const authenticatedUser = await fakeLogin(payload)

    setUser(authenticatedUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser))

    return authenticatedUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}