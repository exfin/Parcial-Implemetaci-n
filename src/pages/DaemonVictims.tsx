import { useState, useEffect } from "react";
import { VictimCard } from "../components/cards/Victim-card";


export function DaemonVictims() {
  const [message, setMessage] = useState("");
  const [victims, setVictims] = useState<any[]>([]);
  const [loadingVictims, setLoadingVictims] = useState(true);

  useEffect(() => {
    fetchVictims();
  }, []);

  const fetchVictims = async () => {
    try {
      setLoadingVictims(true);
      const token = localStorage.getItem("jwt_token");

      const response = await fetch(
        `${import.meta.env.VITE_PORT}/api/victim/my-victims`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Victims retrieved successfully");
        setVictims(result.data || []);
      } else {
        setMessage(result.message || "error");
        setVictims([]);
      }
    } catch (error) {
      console.error("Error fetching victims:", error);
      setVictims([]);
    } finally {
      setLoadingVictims(false);
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">My Victims</h3>
      
              {loadingVictims ? (
                <p className="text-gray-600 dark:text-gray-400">Loading Victims...</p>
              ) : victims.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">There's no Victims</p>
              ) : (
                <div className="space-y-4">
                  {victims.map((victim) => (
                    <VictimCard key={victim.code} victim={victim} onUpdate={fetchVictims} />
                  ))}
                </div>
              )}
            </div>
            
            {message && (
            <div
                className={`mt-4 p-3 rounded-md ${
                message.includes("successfully")
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                }`}
            >
                {message}
            </div>
            )}
        
    </div>
  );
}
