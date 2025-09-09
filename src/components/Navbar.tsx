"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, LogOut } from "lucide-react"
import { useAuth, userRoles } from "../contexts/auth-context"

interface NavItem {
  label: string
  href: string
  requiresAuth?: boolean
  requiresAdmin?: boolean
  requiresNetworkad?: boolean
}

interface NavbarProps {
  brand?: string
  items?: NavItem[]
  className?: string
}

const defaultItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Daemon", href: "/daemonpanel", requiresAuth: true },
  { label: "Admin", href: "/adminpanel", requiresAdmin: true },
  { label: "Resistance", href: "/resistance"},
]

export function Navbar({ brand = "Mi App", items = defaultItems, className = "" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, logout, canAccessDashboard, canAccessReports, canAccessAdmin } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  const isActiveLink = (href: string) => {
    return location.pathname === href
  }

  const visibleItems = items.filter((item) => {
    if (item.requiresAdmin) {
      return user !== null && canAccessAdmin()
    }
    if (item.requiresNetworkad) {
      return user !== null && canAccessReports()
    }
    if (item.requiresAuth) {
      return user !== null && canAccessDashboard()
    }
    return true
  })

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const getUserRoleDisplay = () => {
  if (!user) return ""
  switch (user.role) {
    case userRoles.admin:
      return "Admin"
    case userRoles.networkad:
      return "Network Admin"
    case userRoles.daemon:
      return "Daemon"
    default:
      return "Usuario"
  }
}


  return (
    <nav className={`bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {brand}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActiveLink(item.href)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hi, {user.name} ({getUserRoleDisplay()})
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                >
                  <LogOut size={16} className="mr-1" />
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Alternar menú"
            type="button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActiveLink(item.href)
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <div className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                Hola, {user.name} ({getUserRoleDisplay()})
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <LogOut size={16} className="inline mr-2" />
                Salir
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
