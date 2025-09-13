import { useState } from "react";
import { userRoles } from "../../types/User";

export function EditDaemonCard({ daemon, onUpdate }: { daemon: any; onUpdate: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    role: daemon.role,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/user/${daemon.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: daemon.id,
          ...editData,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        console.log("ok");
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating daemon:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`¿Seguro que quieres eliminar el daemon con email ${daemon.email}?`)) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/user/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: daemon.email, 
        }),
      });

      if (response.ok) {
        console.log("Daemon eliminado");
        onUpdate();
      }
    } catch (error) {
      console.error("Error eliminando daemon:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      role: daemon.role,
    });
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rol</label>
            <select
              name="role"
              value={editData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value={userRoles.daemon}>Daemon</option>
              <option value={userRoles.networkad}>Networkad</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              {isUpdating ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md ml-auto"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{daemon.name}</h4>
            <p className="text-gray-600 dark:text-gray-400">{daemon.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Role: {daemon.role}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">ID: {daemon.id}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}
