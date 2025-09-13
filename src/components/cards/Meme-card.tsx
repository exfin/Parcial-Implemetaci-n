export function MemeCard({ content }: { content: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.title}</h4>
      {content.imageUrl && (
        <img
          src={content.imageUrl}
          alt={content.altText || "meme"}
          className="rounded mb-3 max-h-64 object-cover w-full"
        />
      )}
      <p className="text-gray-700 dark:text-gray-300">{content.bodyMd}</p>
    </div>
  )
}
