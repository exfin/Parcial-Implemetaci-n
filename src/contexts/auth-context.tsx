"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { userRoles, type User } from "../types/User"

interface AuthContextType {
  user: User | null
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
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un token guardado al cargar la aplicación
    const savedToken = localStorage.getItem("jwt_token")
    const savedUser = localStorage.getItem("user_data")

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulación de llamada a API - reemplaza con tu endpoint real
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setToken(data.token)
        setUser(data.user)

        // Guardar en localStorage
        localStorage.setItem("jwt_token", data.token)
        localStorage.setItem("user_data", JSON.stringify(data.user))

        return true
      }
      return false
    } catch (error) {
      console.error("Error en login:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("jwt_token")
    localStorage.removeItem("user_data")
  }

  const isAdmin = (): boolean => {
    return user?.role === userRoles.admin
  }

  const isNetworkad = (): boolean => {
    return user?.role === userRoles.networkad
  }

  const isDaemon = (): boolean => {
    return user?.role === userRoles.daemon
  }

  const canAccessDashboard = (): boolean => {
    return user?.role === userRoles.admin || user?.role === userRoles.daemon
  }

  const canAccessReports = (): boolean => {
    return user?.role === userRoles.admin || user?.role === userRoles.networkad
  }

  const canAccessAdmin = (): boolean => {
    return user?.role === userRoles.admin
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
