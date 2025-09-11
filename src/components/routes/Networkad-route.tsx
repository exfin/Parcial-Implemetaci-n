"use client"

import type React from "react"
import { useAuth } from "../../contexts/auth-context"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userRoles } from "../../contexts/auth-context"

interface NetworkadRouteProps {
  children: React.ReactNode
}

export function NetworkadRoute({ children }: NetworkadRouteProps) {
  const { role, isLoading, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!token || role !== userRoles.networkad)) {
      navigate("/")
    }
  }, [role, token, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!token || role !== userRoles.networkad) {
    return null
  }

  return <>{children}</>
}
