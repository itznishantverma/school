import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { Edit, Trash2, Plus } from 'lucide-react';
import type { Announcement } from '../../types';

export function AnnouncementManager() {
  const { announcementManager } = useManagers();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const data = await announcementManager.getAnnouncements();
    setAnnouncements(data);
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditing(true);
  };

  const handleDelete = async (announcementId: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      await announcementManager.deleteAnnouncement(announcementId);
      loadAnnouncements();
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Author', accessor: (announcement: Announcement) => 
      announcement.author ? `${announcement.author.first_name} ${announcement.author.last_name}` : 'Unknown'
    },
    { header: 'Date', accessor: (announcement: Announcement) => 
      new Date(announcement.created_at).toLocaleDateString()
    },
    {
      header: 'Actions',
      accessor: (announcement: Announcement) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(announcement)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(announcement.id)}
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
        <h2 className="text-2xl font-bold">Announcement Management</h2>
        <button
          onClick={() => {
            setSelectedAnnouncement(null);
            setIsEditing(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Announcement
        </button>
      </div>

      <DataTable
        data={announcements}
        columns={columns}
      />

      {isEditing && (
        <AnnouncementForm
          announcement={selectedAnnouncement}
          onClose={() => setIsEditing(false)}
          onSubmit={async (data) => {
            if (selectedAnnouncement) {
              await announcementManager.updateAnnouncement(selectedAnnouncement.id, data);
            } else {
              await announcementManager.createAnnouncement(data);
            }
            setIsEditing(false);
            loadAnnouncements();
          }}
        />
      )}
    </div>
  );
}

interface AnnouncementFormProps {
  announcement: Announcement | null;
  onClose: () => void;
  onSubmit: (data: Partial<Announcement>) => Promise<void>;
}

function AnnouncementForm({ announcement, onClose, onSubmit }: AnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    content: announcement?.content || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {announcement ? 'Edit Announcement' : 'Add Announcement'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
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
              {announcement ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}