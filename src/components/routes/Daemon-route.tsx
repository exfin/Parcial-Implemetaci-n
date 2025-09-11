"use client"

import type React from "react"
import { useAuth } from "../../contexts/auth-context"
import { Navigate, useLocation } from "react-router-dom"
import { userRoles } from "../../contexts/auth-context"

interface DaemonRouteProps {
  children: React.ReactNode
}

export function DaemonRoute({ children }: DaemonRouteProps) {
  const { role, token, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (role !== userRoles.daemon && role !== userRoles.admin) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
