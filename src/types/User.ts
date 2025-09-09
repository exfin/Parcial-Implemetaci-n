type EnumLike<T> = T[keyof T]

const userRoles = {
  daemon: "DAEMON",
  admin: "ADMIN",
  networkad: "NETWORKAD",
} as const

export type UserRole = EnumLike<typeof userRoles>
// "DAEMON" | "ADMIN" | "NETWORKAD"

export { userRoles }

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

