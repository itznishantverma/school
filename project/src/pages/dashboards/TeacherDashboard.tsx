import { Users, BookOpen, Calendar, Clock, Bell } from 'lucide-react';

export function TeacherDashboard() {
  const classes = [
    { name: 'Physics 101', students: 25, time: '9:00 AM', room: 'Lab 1' },
    { name: 'Physics 201', students: 20, time: '11:00 AM', room: 'Lab 2' },
    { name: 'Advanced Physics', students: 15, time: '2:00 PM', room: 'Lab 1' }
  ];

  const tasks = [
    { title: 'Grade Physics 101 Reports', deadline: '2024-03-28', priority: 'High' },
    { title: 'Prepare Lab Materials', deadline: '2024-03-29', priority: 'Medium' },
    { title: 'Department Meeting', deadline: '2024-03-30', priority: 'Low' }
  ];

  const notifications = [
    { message: 'New assignment submission from John Doe', time: '2 hours ago' },
    { message: 'Staff meeting reminder', time: '3 hours ago' },
    { message: 'Grade submission deadline approaching', time: '5 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Teacher Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold">60</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <BookOpen className="h-10 w-10 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Classes</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Clock className="h-10 w-10 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Hours Today</p>
                <p className="text-2xl font-semibold">6</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Classes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>
            <div className="space-y-4">
              {classes.map((class_, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{class_.name}</p>
                    <p className="text-sm text-gray-600">Room: {class_.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{class_.time}</p>
                    <p className="text-sm text-gray-600">{class_.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-600">{task.deadline}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start border-b pb-4 last:border-0">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-600">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}