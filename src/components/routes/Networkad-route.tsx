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
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== userRoles.networkad)) {
      navigate("/")
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== userRoles.networkad) {
    return null
  }

  return <>{children}</>
}
