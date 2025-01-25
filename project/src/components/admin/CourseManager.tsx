import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { Edit, Trash2, BookPlus } from 'lucide-react';
import type { Course } from '../../types';

export function CourseManager() {
  const { courseManager } = useManagers();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await courseManager.getCourses();
    setCourses(data);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsEditing(true);
  };

  const handleDelete = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      await courseManager.deleteCourse(courseId);
      loadCourses();
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Department', accessor: 'department' },
    { header: 'Teacher', accessor: (course: Course) => course.teacher?.first_name + ' ' + course.teacher?.last_name },
    {
      header: 'Actions',
      accessor: (course: Course) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(course)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(course.id)}
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
        <h2 className="text-2xl font-bold">Course Management</h2>
        <button
          onClick={() => {
            setSelectedCourse(null);
            setIsEditing(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <BookPlus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      <DataTable
        data={courses}
        columns={columns}
      />

      {isEditing && (
        <CourseForm
          course={selectedCourse}
          onClose={() => setIsEditing(false)}
          onSubmit={async (data) => {
            if (selectedCourse) {
              await courseManager.updateCourse(selectedCourse.id, data);
            } else {
              await courseManager.createCourse(data);
            }
            setIsEditing(false);
            loadCourses();
          }}
        />
      )}
    </div>
  );
}

interface CourseFormProps {
  course: Course | null;
  onClose: () => void;
  onSubmit: (data: Partial<Course>) => Promise<void>;
}

function CourseForm({ course, onClose, onSubmit }: CourseFormProps) {
  const [formData, setFormData] = useState({
    name: course?.name || '',
    description: course?.description || '',
    department: course?.department || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {course ? 'Edit Course' : 'Add Course'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              Department
            </label>
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
              {course ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}