import { useState } from 'react';
import { UserManager } from '../../components/admin/UserManager';
import { CourseManager } from '../../components/admin/CourseManager';
import { FacultyManager } from '../../components/admin/FacultyManager';
import { AcademicManager } from '../../components/admin/AcademicManager';
import { AdmissionManager } from '../../components/admin/AdmissionManager';
import { AnnouncementManager } from '../../components/admin/AnnouncementManager';
import { EventManager } from '../../components/admin/EventManager';
import { NewsManager } from '../../components/admin/NewsManager';
import { AttendanceManager } from '../../components/admin/AttendanceManager';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManager />;
      case 'courses':
        return <CourseManager />;
      case 'faculty':
        return <FacultyManager />;
      case 'academic':
        return <AcademicManager />;
      case 'admissions':
        return <AdmissionManager />;
      case 'announcements':
        return <AnnouncementManager />;
      case 'events':
        return <EventManager />;
      case 'news':
        return <NewsManager />;
      case 'attendance':
        return <AttendanceManager />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700">Welcome to Admin Dashboard</h2>
            <p className="mt-2 text-gray-600">Select a section from above to manage school data</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          
          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'users', name: 'Users' },
                { id: 'courses', name: 'Courses' },
                { id: 'faculty', name: 'Faculty' },
                { id: 'academic', name: 'Academic' },
                { id: 'attendance', name: 'Attendance' },
                { id: 'admissions', name: 'Admissions' },
                { id: 'announcements', name: 'Announcements' },
                { id: 'events', name: 'Events' },
                { id: 'news', name: 'News' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
}