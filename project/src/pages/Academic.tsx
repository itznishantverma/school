import { BookOpen, Calendar, Clock, Users } from 'lucide-react';

export function Academic() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Academic Programs</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Comprehensive education programs designed to nurture excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Elementary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Elementary Education</h3>
              <p className="text-gray-600 mb-4">
                Foundation years focusing on core subjects and developmental skills.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Grades 1-5</li>
                <li>• Core curriculum subjects</li>
                <li>• Hands-on learning activities</li>
                <li>• Individual attention</li>
              </ul>
            </div>

            {/* Middle School */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Middle School</h3>
              <p className="text-gray-600 mb-4">
                Transitional years with expanded subject areas and skill development.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Grades 6-8</li>
                <li>• Advanced core subjects</li>
                <li>• Elective courses</li>
                <li>• Project-based learning</li>
              </ul>
            </div>

            {/* High School */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">High School</h3>
              <p className="text-gray-600 mb-4">
                College preparatory curriculum with specialized tracks.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Grades 9-12</li>
                <li>• AP/IB Programs</li>
                <li>• College counseling</li>
                <li>• Career guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Academic Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Class Schedule</h3>
              <p className="text-gray-600">
                Balanced schedule with core subjects in the morning and 
                specialized activities in the afternoon.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Class Size</h3>
              <p className="text-gray-600">
                Small class sizes ensuring individual attention and 
                optimal learning environment.
              </p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Academic Calendar</h3>
              <p className="text-gray-600">
                Structured academic year with regular breaks and 
                special activity periods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}