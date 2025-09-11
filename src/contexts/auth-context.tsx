"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { userRoles, type UserRole } from "../types/User"

interface AuthContextType {
  role: UserRole | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAdmin: () => boolean
  isNetworkad: () => boolean
  isDaemon: () => boolean
  canAccessDashboard: () => boolean
  canAccessReports: () => boolean
  canAccessAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export { type UserRole, userRoles } from "../types/User"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt_token")
    const savedRole = localStorage.getItem("user_role")

    if (savedToken && savedRole) {
      setToken(savedToken)
      setRole(savedRole as UserRole)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_PORT}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const result = await response.json()

      const { token, role } = result.data

      console.log(token)
      console.log(role)

      setToken(token)
      setRole(role)

      localStorage.setItem("jwt_token", token) // no need to JSON.stringify for plain strings
      localStorage.setItem("user_role", role)

      return true
    }
    return false
  } catch (error) {
    console.error("Error en login:", error)
    return false
  }
}


  const logout = () => {
    setRole(null)
    setToken(null)
    localStorage.removeItem("jwt_token")
    localStorage.removeItem("user_role")
  }

  const isAdmin = (): boolean => role === userRoles.admin
  const isNetworkad = (): boolean => role === userRoles.networkad
  const isDaemon = (): boolean => role === userRoles.daemon

  const canAccessDashboard = (): boolean =>
    role === userRoles.admin || role === userRoles.daemon

  const canAccessReports = (): boolean =>
    role === userRoles.admin || role === userRoles.networkad

  const canAccessAdmin = (): boolean => role === userRoles.admin

  return (
    <AuthContext.Provider
      value={{
        role,
        token,
        login,
        logout,
        isLoading,
        isAdmin,
        isNetworkad,
        isDaemon,
        canAccessDashboard,
        canAccessReports,
        canAccessAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
