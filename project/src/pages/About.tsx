import { GraduationCap, Award, Users, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About EduExcel Academy</h1>
            <p className="text-xl max-w-2xl mx-auto">
              A legacy of excellence in education since 1970, shaping future leaders and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide exceptional education that empowers students to become lifelong learners,
                critical thinkers, and responsible global citizens through innovative teaching methods
                and a supportive learning environment.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be a leading educational institution that sets the standard for academic excellence,
                character development, and innovative learning, preparing students for success in an
                ever-changing world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <GraduationCap className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
              <p className="text-gray-600">Consistently high academic achievements and results</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accreditation</h3>
              <p className="text-gray-600">Recognized by leading educational bodies</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Highly qualified and experienced teachers</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
              <p className="text-gray-600">International curriculum and diverse community</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}