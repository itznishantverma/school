import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import type { Profile } from '../../types';

export function FacultyManager() {
  const { facultyManager } = useManagers();
  const { showToast } = useToast();
  const [faculty, setFaculty] = useState<Profile[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Profile | null>(null);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const data = await facultyManager.getFaculty();
      setFaculty(data);
    } catch (error) {
      console.error('Error loading faculty:', error);
      showToast('Error loading faculty members', 'error');
    }
  };

  const handleDelete = async (teacherId: string) => {
    if (confirm('Are you sure you want to remove this faculty member?')) {
      try {
        await facultyManager.deleteFaculty(teacherId);
        showToast('Faculty member removed successfully', 'success');
        loadFaculty();
      } catch (error) {
        console.error('Error deleting faculty:', error);
        showToast('Error removing faculty member', 'error');
      }
    }
  };

  const columns = [
    { header: 'Name', accessor: (teacher: Profile) => `${teacher.first_name} ${teacher.last_name}` },
    { header: 'Email', accessor: 'email' },
    { header: 'Department', accessor: 'department' },
    {
      header: 'Actions',
      accessor: (teacher: Profile) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedTeacher(teacher);
              setIsEditing(true);
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(teacher.id)}
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
        <h2 className="text-2xl font-bold">Faculty Management</h2>
        <button
          onClick={() => setIsAddingTeacher(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Faculty
        </button>
      </div>

      <DataTable
        data={faculty}
        columns={columns}
      />

      {isAddingTeacher && (
        <AddFacultyForm
          onClose={() => setIsAddingTeacher(false)}
          onSubmit={async (data) => {
            try {
              await facultyManager.createFaculty(data);
              showToast('Faculty member added successfully', 'success');
              setIsAddingTeacher(false);
              loadFaculty();
            } catch (error) {
              console.error('Error adding faculty:', error);
              showToast('Error adding faculty member', 'error');
            }
          }}
        />
      )}

      {isEditing && selectedTeacher && (
        <EditFacultyForm
          teacher={selectedTeacher}
          onClose={() => {
            setIsEditing(false);
            setSelectedTeacher(null);
          }}
          onSubmit={async (data) => {
            try {
              await facultyManager.updateFaculty(selectedTeacher.id, data);
              showToast('Faculty member updated successfully', 'success');
              setIsEditing(false);
              setSelectedTeacher(null);
              loadFaculty();
            } catch (error) {
              console.error('Error updating faculty:', error);
              showToast('Error updating faculty member', 'error');
            }
          }}
        />
      )}
    </div>
  );
}

interface AddFacultyFormProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

function AddFacultyForm({ onClose, onSubmit }: AddFacultyFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    department: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add New Faculty Member</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface EditFacultyFormProps {
  teacher: Profile;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

function EditFacultyForm({ teacher, onClose, onSubmit }: EditFacultyFormProps) {
  const [formData, setFormData] = useState({
    first_name: teacher.first_name,
    last_name: teacher.last_name,
    department: teacher.department || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Faculty Member</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}