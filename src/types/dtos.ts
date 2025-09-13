
export interface UserDTO {
  id: number
  name: string
  email: string
}

export interface VictimDTO {
  code: string
  alias: string
  notes: string
  active: boolean
  createdBy: UserDTO
  createdAt: string
  updatedAt: string
}

export interface ReportDTO {
  id: number
  anonymous: boolean
  createdBy: UserDTO
  ipHash: string
  title: string
  description: string
  severity: string
  victim: VictimDTO
  status: string
  reviewedBy?: UserDTO
  reviewNotes?: string
  createdAt: string
  updatedAt: string
}

export interface PublicContentDTO {
  id: number
  type: string
  title: string
  bodyMd: string
  imageUrl: string
  altText: string
  submittedBy: UserDTO
  approved: boolean
  createdAt: string
  updatedAt: string | null
}