import { useState, useEffect } from "react"
import { ApproveContentCard } from "../components/cards/ApproveContent-card"

export function ManageContent() {
  const [contents, setContents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      fetchData();
  }, []);

  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt_token")
        const response = await fetch(`${import.meta.env.VITE_PORT}/api/content/not-approved`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        const result = await response.json()
        if (response.ok) {
          setContents(result.data)
        } else {
          console.error(result.message)
        }
      } catch (error) {
        console.error("Error fetching content:", error)
      } finally {
        setLoading(false)
      }
    }
    

  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-white mb-4">Manage Content</h2>
      <p className="dark:text-gray-400 mb-6">Approve Submitted Content</p>

      {loading ? (
        <p className="dark:text-gray-400">Loading...</p>
      ) : contents.length > 0 ? (
        contents.map((content) => (
          <ApproveContentCard
            key={content.id}
            content={content}
            onUpdate={fetchData}
          />
        ))
      ) : (
        <p className="dark:text-gray-400">No pending content 🎉</p>
      )}
    </div>
  )
}