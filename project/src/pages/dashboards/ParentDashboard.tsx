import { User, BookOpen, Calendar, Clock, CreditCard, FileText } from 'lucide-react';

export function ParentDashboard() {
  const children = [
    {
      name: 'Emma Wilson',
      grade: '10th Grade',
      attendance: '95%',
      gpa: '3.8',
      recentGrades: [
        { subject: 'Mathematics', grade: 'A' },
        { subject: 'Physics', grade: 'B+' },
        { subject: 'Literature', grade: 'A-' }
      ]
    }
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: '2024-03-28', time: '3:00 PM' },
    { title: 'Science Fair', date: '2024-04-15', time: '9:00 AM' },
    { title: 'Sports Day', date: '2024-05-01', time: '8:00 AM' }
  ];

  const payments = [
    { description: 'Tuition Fee - March', amount: '$500', status: 'Paid', date: '2024-03-01' },
    { description: 'Lab Fee', amount: '$50', status: 'Pending', date: '2024-03-15' },
    { description: 'Field Trip', amount: '$30', status: 'Paid', date: '2024-03-10' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Parent Dashboard</h1>

        {/* Student Overview */}
        {children.map((child, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center mb-6">
              <User className="h-12 w-12 text-blue-600" />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{child.name}</h2>
                <p className="text-gray-600">{child.grade}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Attendance</p>
                <p className="text-2xl font-semibold text-blue-600">{child.attendance}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800">GPA</p>
                <p className="text-2xl font-semibold text-green-600">{child.gpa}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Current Term</p>
                <p className="text-2xl font-semibold text-purple-600">Spring 2024</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Grades</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {child.recentGrades.map((grade, gradeIndex) => (
                  <div key={gradeIndex} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">{grade.subject}</p>
                    <p className="text-xl font-semibold text-gray-900">{grade.grade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.date}</span>
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            <div className="space-y-4">
              {payments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <span className={`text-sm font-medium ${
                      payment.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'View Schedule', icon: Calendar },
              { name: 'Make Payment', icon: CreditCard },
              { name: 'View Reports', icon: FileText },
              { name: 'Contact Teacher', icon: User }
            ].map((action, index) => (
              <button
                key={index}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <action.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 block text-center">
                  {action.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}