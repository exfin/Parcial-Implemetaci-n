import { useState, useEffect } from "react"
import { incentiveTypes } from "../types/enums"
import { IncentiveInfo } from "../components/cards/IncentiveInfo-card"

export function DaemonReward() {
  const [formData, setFormData] = useState({
    email: "",
    type: incentiveTypes.reward,
    name: "",
    description: "",
    points: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [incentives, setIncentives] = useState<any[]>([])
  const [loadingIncentives, setLoadingIncentives] = useState(true)

  useEffect(() => {
    fetchIncentives()
  }, [])

  const fetchIncentives = async () => {
    try {
      const token = localStorage.getItem("jwt_token")
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/incentive/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

      })
      const result = await response.json()
      if (response.ok) {
        setIncentives(result.data || [])
      }
    } catch (error) {
      console.error("Error fetching incentives:", error)
    } finally {
      setLoadingIncentives(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "points" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const token = localStorage.getItem("jwt_token")
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/incentive/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          user: {
            email: formData.email,
          },
          type: formData.type,
          name: formData.name,
          description: formData.description,
          points: formData.points,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage("Incentive Created Succesfully")
        setFormData({
          email: "",
          type: incentiveTypes.reward,
          name: "",
          description: "",
          points: 0,
        })
      } else {
        setMessage(result.error || "There's been an error")
      }
    } catch (error) {
      setMessage("Connection Error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-white mb-4">Reward? Daemon</h2>
      <p className="dark:text-white mb-6">Reward a Daemon with a little price</p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create reward</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Daemon Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="daemon@example.com"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Incentive type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={incentiveTypes.reward}>Reward</option>
              <option value={incentiveTypes.punishment}>Punishment</option>
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Incentive name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
             
            />
          </div>

          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Points
            </label>
            <input
              type="number"
              id="points"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.includes("Succesfully")
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">All Incentives</h3>

        {loadingIncentives ? (
          <p className="text-gray-600 dark:text-gray-400">Loading incentives...</p>
        ) : incentives.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No incentives found</p>
        ) : (
          <div className="space-y-4">
            {incentives.map((incentive) => (
              <IncentiveInfo key={incentive.id} incentive={incentive} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
