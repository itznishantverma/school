import { useState, useEffect } from 'react';
import { useManagers } from '../../hooks/useManagers';
import { DataTable } from '../DataTable';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Admission } from '../../types';

export function AdmissionManager() {
  const { admissionManager } = useManagers();
  const [admissions, setAdmissions] = useState<Admission[]>([]);

  useEffect(() => {
    loadAdmissions();
  }, []);

  const loadAdmissions = async () => {
    const data = await admissionManager.getAdmissions();
    setAdmissions(data);
  };

  const handleStatusUpdate = async (admissionId: string, status: string) => {
    await admissionManager.updateAdmissionStatus(admissionId, status);
    loadAdmissions();
  };

  const columns = [
    { header: 'Applicant Name', accessor: 'applicant_name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Grade', accessor: 'grade_applying_for' },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Actions',
      accessor: (admission: Admission) => (
        <div className="flex space-x-2">
          {admission.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusUpdate(admission.id, 'approved')}
                className="p-1 text-green-600 hover:text-green-800"
                title="Approve"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleStatusUpdate(admission.id, 'rejected')}
                className="p-1 text-red-600 hover:text-red-800"
                title="Reject"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admission Management</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Total Applications</p>
          <p className="text-2xl font-semibold">{admissions.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-semibold text-yellow-600">
            {admissions.filter(a => a.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-semibold text-green-600">
            {admissions.filter(a => a.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-semibold text-red-600">
            {admissions.filter(a => a.status === 'rejected').length}
          </p>
        </div>
      </div>

      <DataTable
        data={admissions}
        columns={columns}
      />
    </div>
  );
}