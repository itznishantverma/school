import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { UserForm } from './UserForm';
import type { Profile } from '../../types';

export function UserManager() {
  const { userManager } = useManagers();
  const [users, setUsers] = useState<Profile[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userManager.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleEdit = (user: Profile) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await userManager.deleteUser(userId);
      loadUsers();
    }
  };

  const columns = [
    { header: 'Name', accessor: (user: Profile) => `${user.first_name} ${user.last_name}` },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Actions',
      accessor: (user: Profile) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(user)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <DataTable
        data={users}
        columns={columns}
      />

      {showAddUser && (
        <UserForm
          onClose={() => setShowAddUser(false)}
          onSuccess={() => {
            loadUsers();
            setShowAddUser(false);
          }}
        />
      )}

      {isEditing && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              await userManager.updateUser(selectedUser.id, selectedUser);
              setIsEditing(false);
              loadUsers();
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={selectedUser.first_name}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    first_name: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={selectedUser.last_name}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    last_name: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    role: e.target.value as Profile['role']
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}