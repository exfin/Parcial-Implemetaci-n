import { useEffect, useState } from 'react';
import { EditDaemonCard } from '../components/cards/EditDaemon-card';
import { userRoles } from '../types/User';

export function DaemonManagement() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [daemons, setDaemons] = useState<any[]>([]);
  const [loadingDaemons, setLoadingDaemons] = useState(true);

  useEffect(() => {
    fetchDaemons();
  }, []);

  const fetchDaemons = async () => {
    try {
      setLoadingDaemons(true);
      const token = localStorage.getItem('jwt_token');

      const response = await fetch(
        `${import.meta.env.VITE_PORT}/api/user/find-by-role?role=${userRoles.daemon}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch daemons: ${errorText}`);
      }

      const result = await response.json();
      setDaemons(result.data || []);
    } catch (error) {
      console.error('Error fetching daemons:', error);
      setDaemons([]);
    } finally {
      setLoadingDaemons(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch(`${import.meta.env.VITE_PORT}/api/user/create-daemon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Daemon creado exitosamente');
        setFormData({ email: '', password: '', name: '' });
      } else {
        setMessage(result.error || 'Error al crear daemon');
      }
    } catch (error) {
      setMessage('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold dark:text-white mb-4">Daemon's Management</h2>
      <p className="dark:text-gray-400 mb-6">See, edit (or destroy daemons)</p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add new Daemon</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {isLoading ? 'Creating...' : 'Create Daemon'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.includes('exitosamente')
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {message}
          </div>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Daemon's List</h3>

        {loadingDaemons ? (
          <p className="text-gray-600 dark:text-gray-400">Loading daemons...</p>
        ) : daemons.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">There's no daemons</p>
        ) : (
          <div className="space-y-4">
            {daemons.map((daemon) => (
              <EditDaemonCard key={daemon.id} daemon={daemon} onUpdate={fetchDaemons} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
