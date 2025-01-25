import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';

export function Faculty() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const db = useDatabase();

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const data = await db.fetchTeachers();
      setFaculty(data);
    } catch (error) {
      console.error('Error loading faculty:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Our Faculty</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Meet our team of dedicated educators and experts committed to academic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {faculty.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {faculty.map((member, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{member.first_name} {member.last_name}</h3>
                    <p className="text-gray-600 mb-4">{member.email}</p>
                    <a 
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No faculty members found.</p>
          )}
        </div>
      </section>

      {/* Department Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Academic Departments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Science", "Mathematics", "English", "History", "Arts", "Physical Education"].map((dept, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{dept} Department</h3>
                <p className="text-gray-600">
                  Dedicated to excellence in {dept.toLowerCase()} education through innovative teaching methods and practical applications.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}