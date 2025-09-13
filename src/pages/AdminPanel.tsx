"use client"

import { Outlet, Link } from "react-router-dom"

export function AdminPanel() {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome Andrei
          </p>
        </div>

        {/* Acciones de Admin */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Daemons Management</h3>
            <div className="space-y-3">
              
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                <Link to="daemons" >
                    Manage Daemons
                </Link>
              </button>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                <Link to="daereports" >
                    Daemon's Reports
                </Link>
              </button>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                <Link to="daerewards" >
                    Reward Daemons
                </Link>
              </button>
              
            </div>
          </div>
           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Victims Management</h3>
            <div className="space-y-3">
              
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                <Link to="victims" >
                    Manage Victims
                </Link>
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                <Link to="content" >
                    Manage Content
                </Link>
              </button>
              
            </div>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
