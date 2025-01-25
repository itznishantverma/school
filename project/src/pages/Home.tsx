import { ArrowRight, BookOpen, Users, Trophy, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to EduExcel Academy</h1>
            <p className="text-xl mb-8">Empowering minds, shaping futures</p>
            <Link 
              to="/admission" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md inline-flex items-center hover:bg-blue-700"
            >
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <BookOpen className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
              <p className="text-gray-600">Excellence in academic programs and teaching methodology</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Experienced educators dedicated to student success</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Achievement</h3>
              <p className="text-gray-600">Proven track record of academic excellence</p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Campus Life</h3>
              <p className="text-gray-600">Rich extracurricular activities and events</p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News & Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${item === 1 ? '1523580846011-d3a5bc25702b' : item === 2 ? '1523240795612-9a054b0db644' : '1523580494863-6f3031224c94'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                  alt="Event"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {item === 1 ? 'Annual Science Fair' : item === 2 ? 'Sports Day 2024' : 'Art Exhibition'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item === 1 ? 'Join us for an exciting showcase of student projects and innovations.' 
                      : item === 2 ? 'Annual sports event featuring various competitions and activities.' 
                      : 'Celebrating creativity through student artwork and performances.'}
                  </p>
                  <Link to="/events" className="text-blue-600 hover:text-blue-700">Learn More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8">Take the first step towards academic excellence</p>
          <Link 
            to="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-md inline-flex items-center hover:bg-gray-100"
          >
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}