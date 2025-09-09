type EnumLike<T> = T[keyof T]

const userRoles = {
  daemon: "DAEMON",
  admin: "SUPER_ADMIN",
  networkad: "VICTIM",
} as const

export type UserRole = EnumLike<typeof userRoles>
// "DAEMON" | "SUPER_ADMIN" | "VICTIM"

export { userRoles }

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

