
// Tipo de incentivo
export const incentiveTypes = {
  reward: "REWARD",
  punishment: "PUNISHMENT",
} as const

export type IncentiveType = (typeof incentiveTypes)[keyof typeof incentiveTypes]

// Tipo de contenido público
export const publicContentTypes = {
  tip: "TIP",
  meme: "MEME",
} as const

export type PublicContentType = (typeof publicContentTypes)[keyof typeof publicContentTypes]

// Severidad de reporte
export const reportSeverities = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
} as const

export type ReportSeverity = (typeof reportSeverities)[keyof typeof reportSeverities]

// Estado de reporte
export const reportStatuses = {
  new: "NEW",
  inReview: "IN_REVIEW",
  approved: "APPROVED",
  rejected: "REJECTED",
} as const

export type ReportStatus = (typeof reportStatuses)[keyof typeof reportStatuses]

// Nivel de riesgo
export const riskLevels = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
} as const

export type RiskLevel = (typeof riskLevels)[keyof typeof riskLevels]

// Exportar todos los enums como un objeto para fácil acceso
export const enums = {
  incentiveTypes,
  publicContentTypes,
  reportSeverities,
  reportStatuses,
  riskLevels,
} as const
