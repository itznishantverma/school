import { Bell, Calendar } from 'lucide-react';

export function Announcements() {
  const announcements = [
    {
      title: "Annual Science Fair Registration Open",
      date: "March 15, 2024",
      category: "Events",
      description: "Register now for the upcoming Science Fair. Open to all students from grades 8-12."
    },
    {
      title: "Parent-Teacher Conference Schedule",
      date: "March 20, 2024",
      category: "Academic",
      description: "Spring semester parent-teacher conferences will be held next week. Book your slots online."
    },
    {
      title: "New Computer Lab Opening",
      date: "March 25, 2024",
      category: "Facilities",
      description: "State-of-the-art computer lab opening next week. Features latest hardware and software for students."
    },
    {
      title: "Summer Program Registration",
      date: "April 1, 2024",
      category: "Programs",
      description: "Summer enrichment programs registration begins. Limited spots available."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Announcements</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Stay updated with the latest news and events at EduExcel Academy.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {announcements.map((announcement, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <Bell className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-600">{announcement.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 mb-4">{announcement.description}</p>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{announcement.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Announcement Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Academic', 'Events', 'Programs', 'Facilities'].map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold text-blue-600">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}