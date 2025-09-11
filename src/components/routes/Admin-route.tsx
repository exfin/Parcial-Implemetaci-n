import type React from "react"
import { useAuth, userRoles } from "../../contexts/auth-context"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { role, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (!role) {
        navigate("/login")
      } else if (role !== userRoles.admin) {
        navigate("/")
      }
    }
  }, [role, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!role || role !== userRoles.admin) {
    return null
  }

  return <>{children}</>
}
