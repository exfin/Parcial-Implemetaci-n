import { userRoles } from "../../contexts/auth-context";

export function VictimCard({ victim, onUpdate }: { victim: any; onUpdate: () => void }) {
  const role = localStorage.getItem("user_role")

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(
        `${import.meta.env.VITE_PORT}/api/victim/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code: victim.code }),
        }
      );

      if (response.ok) {
        console.log(`Victim ${victim.code} deleted`);
        onUpdate(); 
      } else {
        console.error("Failed to delete victim");
      }
    } catch (error) {
      console.error("Error deleting victim:", error);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{victim.code}</h4>
          <p className="text-gray-600 dark:text-gray-400">{victim.alias}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Notes: {victim.notes}</p>
          <p className="text-gray-600 dark:text-gray-400">Risk Level: {victim.riskLevel}</p>
          <p className="text-gray-600 dark:text-gray-400">Created by (ID): {victim.createdBy.id}</p>
        </div>

        {role === userRoles.admin && (
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
