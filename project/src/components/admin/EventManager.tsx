import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { Edit, Trash2, Plus } from 'lucide-react';
import type { Event } from '../../types';

export function EventManager() {
  const { eventManager } = useManagers();
  const [events, setEvents] = useState<Event[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await eventManager.getEvents();
    setEvents(data);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsEditing(true);
  };

  const handleDelete = async (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await eventManager.deleteEvent(eventId);
      loadEvents();
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Type', accessor: 'type' },
    { header: 'Start Date', accessor: (event: Event) => new Date(event.start_date).toLocaleDateString() },
    { header: 'End Date', accessor: (event: Event) => new Date(event.end_date).toLocaleDateString() },
    {
      header: 'Actions',
      accessor: (event: Event) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(event)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(event.id)}
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
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsEditing(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </button>
      </div>

      <DataTable
        data={events}
        columns={columns}
      />

      {isEditing && (
        <EventForm
          event={selectedEvent}
          onClose={() => setIsEditing(false)}
          onSubmit={async (data) => {
            if (selectedEvent) {
              await eventManager.updateEvent(selectedEvent.id, data);
            } else {
              await eventManager.createEvent(data);
            }
            setIsEditing(false);
            loadEvents();
          }}
        />
      )}
    </div>
  );
}

interface EventFormProps {
  event: Event | null;
  onClose: () => void;
  onSubmit: (data: Partial<Event>) => Promise<void>;
}

function EventForm({ event, onClose, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    type: event?.type || 'academic',
    location: event?.location || '',
    start_date: event?.start_date ? new Date(event.start_date).toISOString().split('T')[0] : '',
    end_date: event?.end_date ? new Date(event.end_date).toISOString().split('T')[0] : ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {event ? 'Edit Event' : 'Add Event'}
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
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Event['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
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
              {event ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}