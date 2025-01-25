import { BookOpen, Clock, Users, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';

export function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const db = useDatabase();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await db.fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Comprehensive academic programs designed to challenge and inspire.
            </p>
          </div>
        </div>
      </section>

      {/* Course Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                      <p className="text-gray-600">{course.department} Department</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  {course.teacher && (
                    <p className="text-sm text-gray-500">
                      Instructor: {course.teacher.first_name} {course.teacher.last_name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No courses available at the moment.</p>
          )}
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Course Features</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <BookOpen className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
              <p className="text-gray-600">Detailed course materials and resources</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Small Class Sizes</h3>
              <p className="text-gray-600">Individual attention and interaction</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Balanced academic timetable</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certification</h3>
              <p className="text-gray-600">Recognized academic credentials</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}