import { useState } from 'react'
import { useUserStore } from '../../lib/hooks/useUserStore'
import { Edit, Trash2, UserPlus, Shield } from 'lucide-react'
import { format } from 'date-fns'

export default function UserManagement() {
  const { users, isLoading, error, fetchUsers, updateUserRole, deleteUser } = useUserStore()
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function handleRoleUpdate(userId: string, role: string) {
    try {
      setIsUpdating(true)
      await updateUserRole(userId, role)
    } catch (error) {
      console.error('Error updating role:', error)
    } finally {
      setIsUpdating(false)
      setSelectedUserId('')
      setSelectedRole('')
    }
  }

  async function handleDelete(userId: string) {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      setIsUpdating(true)
      await deleteUser(userId)
    } catch (error) {
      console.error('Error deleting user:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage user roles and permissions
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      User
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Joined
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt=""
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                          )}
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{user.full_name}</div>
                            <div className="text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {selectedUserId === user.id ? (
                          <select
                            value={selectedRole || user.role}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(user.created_at), 'MMM d, yyyy')}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end space-x-2">
                          {selectedUserId === user.id ? (
                            <>
                              <button
                                onClick={() => handleRoleUpdate(user.id, selectedRole || user.role)}
                                disabled={isUpdating}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Shield className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUserId('')
                                  setSelectedRole('')
                                }}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setSelectedUserId(user.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isUpdating}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
