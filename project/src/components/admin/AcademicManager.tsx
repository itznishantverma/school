import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { Edit, CheckCircle } from 'lucide-react';

export function AcademicManager() {
  const { academicManager } = useManagers();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [grades, setGrades] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isEditingGrade, setIsEditingGrade] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  useEffect(() => {
    if (selectedStudentId) {
      loadStudentData(selectedStudentId);
    }
  }, [selectedStudentId]);

  const loadStudentData = async (studentId: string) => {
    const [gradesData, attendanceData] = await Promise.all([
      academicManager.getGrades(studentId),
      academicManager.getAttendance(studentId)
    ]);
    setGrades(gradesData);
    setAttendance(attendanceData);
  };

  const handleGradeUpdate = async (submissionId: string, grade: number) => {
    await academicManager.updateGrade(submissionId, grade);
    if (selectedStudentId) {
      loadStudentData(selectedStudentId);
    }
  };

  const handleAttendanceUpdate = async (attendanceId: string, status: string) => {
    await academicManager.updateAttendance(attendanceId, status);
    if (selectedStudentId) {
      loadStudentData(selectedStudentId);
    }
  };

  const gradeColumns = [
    { header: 'Assignment', accessor: (submission: any) => submission.assignment.title },
    { header: 'Course', accessor: (submission: any) => submission.course.name },
    { header: 'Grade', accessor: (submission: any) => submission.grade || 'Not graded' },
    {
      header: 'Actions',
      accessor: (submission: any) => (
        <button
          onClick={() => {
            setSelectedSubmission(submission);
            setIsEditingGrade(true);
          }}
          className="p-1 text-blue-600 hover:text-blue-800"
        >
          <Edit className="h-4 w-4" />
        </button>
      )
    }
  ];

  const attendanceColumns = [
    { header: 'Date', accessor: (record: any) => new Date(record.date).toLocaleDateString() },
    { header: 'Course', accessor: (record: any) => record.course.name },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Actions',
      accessor: (record: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleAttendanceUpdate(record.id, 'present')}
            className="p-1 text-green-600 hover:text-green-800"
            title="Mark Present"
          >
            <CheckCircle className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Academic Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Grades</h3>
          <DataTable
            data={grades}
            columns={gradeColumns}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Attendance</h3>
          <DataTable
            data={attendance}
            columns={attendanceColumns}
          />
        </div>
      </div>

      {isEditingGrade && selectedSubmission && (
        <GradeForm
          submission={selectedSubmission}
          onClose={() => setIsEditingGrade(false)}
          onSubmit={async (grade) => {
            await handleGradeUpdate(selectedSubmission.id, grade);
            setIsEditingGrade(false);
          }}
        />
      )}
    </div>
  );
}

interface GradeFormProps {
  submission: any;
  onClose: () => void;
  onSubmit: (grade: number) => Promise<void>;
}

function GradeForm({ submission, onClose, onSubmit }: GradeFormProps) {
  const [grade, setGrade] = useState(submission.grade || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(Number(grade));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Update Grade</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grade (0-100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
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
              Update Grade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}