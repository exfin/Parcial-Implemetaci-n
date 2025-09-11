import { type ReportDTO } from "../../types/dtos"
import { useState } from "react"

export function ReportForAdmin({ report }: { report: ReportDTO }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(report.status)

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/report/update-status/${report.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (response.ok) {
        setCurrentStatus(newStatus)
      } else {
        console.error("Error updating report status")
      }
    } catch (error) {
      console.error("Error updating report status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "IN_REVIEW":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "APPROVED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{report.title}</h3>
          <div className="flex gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
              {report.severity}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
              {currentStatus}
            </span>
            {report.anonymous && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                Anónimo
              </span>
            )}
          </div>
        </div>
        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
          <p>ID: #{report.id}</p>
          <p>{new Date(report.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 mb-3">{report.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Report Info</h4>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Created By:</span>{" "}
              {report.anonymous ? "Anonymous" : report.createdBy?.name || "N/A"}
            </p>
            {!report.anonymous && report.createdBy?.email && (
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Email:</span> {report.createdBy.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Victim</h4>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Name:</span> {report.victim?.alias || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Update state</h4>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleStatusUpdate("NEW")}
            disabled={isUpdating || currentStatus === "NEW"}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            New
          </button>
          <button
            onClick={() => handleStatusUpdate("IN_REVIEW")}
            disabled={isUpdating || currentStatus === "IN_REVIEW"}
            className="px-3 py-1 text-sm bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            In Review
          </button>
          <button
            onClick={() => handleStatusUpdate("APPROVED")}
            disabled={isUpdating || currentStatus === "APPROVED"}
            className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            Aproved
          </button>
          <button
            onClick={() => handleStatusUpdate("REJECTED")}
            disabled={isUpdating || currentStatus === "REJECTED"}
            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            Rejected
          </button>
        </div>
        {isUpdating && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Update State...</p>}
      </div>

      {report.reviewedBy && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Review</h4>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">Reviewed by:</span> {report.reviewedBy.name}
            </p>
            {report.reviewNotes && (
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Notes:</span> {report.reviewNotes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
