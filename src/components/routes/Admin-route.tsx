import type React from "react"

import { useAuth, userRoles } from "../../contexts/auth-context"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Si no está autenticado, redirigir al login
        navigate("/login")
      } else if (user.role !== userRoles.admin) {
        // Si no es admin, redirigir al dashboard
        navigate("/")
      }
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== userRoles.admin) {
    return null
  }

  return <>{children}</>
}