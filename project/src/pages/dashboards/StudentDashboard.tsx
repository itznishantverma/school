import { Book, Calendar, Clock, FileText, GraduationCap } from 'lucide-react';

export function StudentDashboard() {
  const courses = [
    { name: 'Mathematics', grade: 'A', progress: 85 },
    { name: 'Physics', grade: 'B+', progress: 78 },
    { name: 'Literature', grade: 'A-', progress: 82 },
    { name: 'History', grade: 'A', progress: 90 }
  ];

  const assignments = [
    { title: 'Math Homework', subject: 'Mathematics', dueDate: '2024-03-28', status: 'Pending' },
    { title: 'Physics Lab Report', subject: 'Physics', dueDate: '2024-03-29', status: 'Submitted' },
    { title: 'Literature Essay', subject: 'Literature', dueDate: '2024-03-30', status: 'In Progress' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Book className="h-10 w-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Current Courses</p>
                <p className="text-2xl font-semibold">4</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <FileText className="h-10 w-10 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <GraduationCap className="h-10 w-10 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">GPA</p>
                <p className="text-2xl font-semibold">3.8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Attendance</p>
                <p className="text-2xl font-semibold">95%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-sm font-semibold text-blue-600">{course.grade}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 rounded-full h-2" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-gray-600">{assignment.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-600">{assignment.dueDate}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      assignment.status === 'Submitted' ? 'text-green-600' :
                      assignment.status === 'Pending' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}