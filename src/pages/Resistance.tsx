import { useState, useEffect } from "react"
import { TipCard } from "../components/cards/Tip-card"
import { MemeCard } from "../components/cards/Meme-card"

export function Resistance() {
  const [formData, setFormData] = useState({
    title: "",
    bodyMd: "",
    type: "TIP",
    imageUrl: "",
    altText: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [approvedContent, setApprovedContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch approved content
  useEffect(() => {
    const fetchApprovedContent = async () => {
      const token = localStorage.getItem("jwt_token")
      try {
        const response = await fetch(`${import.meta.env.VITE_PORT}/api/content/approved`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        })
        const result = await response.json()
        if (response.ok) {
          setApprovedContent(result.data || [])
        } else {
          console.error(result.message || "Error fetching approved content")
        }
      } catch (error) {
        console.error("Error fetching approved content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApprovedContent()
  }, [])

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Submit new content
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    try {
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/content/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage("Content created successfully (waiting for approval)")
        setFormData({
          title: "",
          bodyMd: "",
          type: "TIP",
          imageUrl: "",
          altText: "",
        })
      } else {
        setMessage(result.message || "Error creating content")
      }
    } catch (error) {
      console.error("Error creating content:", error)
      setMessage("Server connection error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col md:flex-row gap-8">
    
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-bold dark:text-white mb-4">Resistance Page</h2>
      <p className="dark:text-white mb-6">Share your tips and memes</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mb-12">
        <div>
          <label className="block text-sm font-medium dark:text-white mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-white mb-1">Content (Markdown)</label>
          <textarea
            name="bodyMd"
            value={formData.bodyMd}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-white mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          >
            <option value="TIP">Tip</option>
            <option value="MEME">Meme</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-white mb-1">Image (URL)</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-white mb-1">Alt text</label>
          <input
            type="text"
            name="altText"
            value={formData.altText}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          {isSubmitting ? "Submitting..." : "Create Content"}
        </button>
      </form>

      {message && <p className="mt-4 dark:text-white">{message}</p>}
    </div>

    
    <div className="w-full md:w-1/2">
      <h3 className="text-xl font-bold dark:text-white mb-4">Approved Content</h3>
      {loading ? (
        <p className="dark:text-gray-400">Loading...</p>
      ) : approvedContent.length > 0 ? (
        <div className="grid gap-6 grid-cols-1">
          {approvedContent.map((content) =>
            content.type === "MEME" ? (
              <MemeCard key={content.id} content={content} />
            ) : (
              <TipCard key={content.id} content={content} />
            )
          )}
        </div>
      ) : (
        <p className="dark:text-gray-400">No approved content yet</p>
      )}
    </div>
  </div>

  )
}