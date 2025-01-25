import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export function AttendanceManager() {
  const { academicManager } = useManagers();
  const [attendance, setAttendance] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedStudentId) {
      loadAttendance(selectedStudentId);
    }
  }, [selectedStudentId]);

  const loadAttendance = async (studentId: string) => {
    try {
      const data = await academicManager.getAttendance(studentId);
      setAttendance(data);
    } catch (error) {
      console.error('Error loading attendance:', error);
    }
  };

  const handleAttendanceUpdate = async (attendanceId: string, status: string) => {
    try {
      await academicManager.updateAttendance(attendanceId, status);
      if (selectedStudentId) {
        loadAttendance(selectedStudentId);
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const columns = [
    { header: 'Date', accessor: (record: any) => new Date(record.date).toLocaleDateString() },
    { header: 'Course', accessor: (record: any) => record.course?.name || 'N/A' },
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
          <button
            onClick={() => handleAttendanceUpdate(record.id, 'absent')}
            className="p-1 text-red-600 hover:text-red-800"
            title="Mark Absent"
          >
            <XCircle className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleAttendanceUpdate(record.id, 'late')}
            className="p-1 text-yellow-600 hover:text-yellow-800"
            title="Mark Late"
          >
            <Clock className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
      </div>

      <DataTable
        data={attendance}
        columns={columns}
      />
    </div>
  );
}