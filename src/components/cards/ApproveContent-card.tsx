
export function ApproveContentCard({ content, onUpdate }: { content: any; onUpdate: () => void }){

    const handleApprove = async () => {
    try {
      const token = localStorage.getItem("jwt_token")
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/content/update/${content.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: true }),
      })

      if (response.ok) {
        onUpdate();
      } else {
        const errorData = await response.json()
        console.error(errorData.message || "Failed to approve content")
      }
    } catch (error) {
      console.error("Error approving content:", error)
    }
  }
   
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mb-4">
      <h3 className="text-lg font-semibold dark:text-white mb-2">{content.title}</h3>
      <p className="dark:text-gray-300 mb-2">{content.bodyMd}</p>
      {content.imageUrl && (
        <img
          src={content.imageUrl}
          alt={content.altText || "content image"}
          className="rounded mb-3 max-h-48 object-cover"
        />
      )}
      <button
        onClick={ handleApprove}
        disabled={content.approved}
        className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Approve
      </button>
    </div>
  )
}
