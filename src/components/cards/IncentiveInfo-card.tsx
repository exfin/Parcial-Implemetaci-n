export function IncentiveInfo({ incentive }: { incentive: any }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "REWARD":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "PUNISHMENT":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{incentive.name}</h3>
          <div className="flex gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(incentive.type)}`}>
              {incentive.type}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {incentive.points} points
            </span>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
          <p>{new Date(incentive.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 mb-3">{incentive.description}</p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">User Information</h4>
        <div className="space-y-1 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">ID:</span> {incentive.user.id}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Name:</span> {incentive.user.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Email:</span> {incentive.user.email}
          </p>
        </div>
      </div>
    </div>
  )
}
