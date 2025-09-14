export function TipCard({ content }: { content: any }) {
  return (
    <div className="bg-blue-50 dark:bg-gray-700 rounded-lg shadow p-4 border border-blue-200 dark:border-gray-600">
      <h4 className="font-semibold text-blue-900 dark:text-white mb-2">{content.title}</h4>
      <p className="text-gray-800 dark:text-gray-200">{content.bodyMd}</p>
    </div>
  )
}