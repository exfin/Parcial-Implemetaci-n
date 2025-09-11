import { useState, useEffect } from "react"
import { type ReportDTO } from "../types/dtos"
import { ReportForAdmin } from "../components/cards/ReportForAdmin-card"

export function DaemonReports() {
  const [reports, setReports] = useState<ReportDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch("http://localhost:8080/api/report/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      const result = await response.json()

      if (response.ok) {
        setReports(result.data || [])
      } else {
        setError(result.message || "Error al cargar reportes")
      }
    } catch (error) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-white mb-4">Daemon Reports</h2>
      <p className="dark:text-white mb-6">All reports made by daemons</p>

      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-600 dark:text-gray-400">No avalaible reports</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportForAdmin key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}