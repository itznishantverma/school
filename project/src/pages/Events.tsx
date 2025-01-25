import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export function Events() {
  const events = [
    {
      title: "Annual Science Fair",
      date: "April 15, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Main Auditorium",
      description: "Showcase of student science projects and innovations.",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Sports Day 2024",
      date: "May 1, 2024",
      time: "8:00 AM - 5:00 PM",
      location: "Sports Complex",
      description: "Annual sports competition featuring various athletic events.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Art Exhibition",
      date: "May 15, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Art Gallery",
      description: "Exhibition of student artwork and performances.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Events & Activities</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Join us for exciting events and activities throughout the academic year.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Monthly Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Monthly Overview</h3>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Event Categories */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Event Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Academic', 'Sports', 'Cultural', 'Workshops'].map((category, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-600">{category}</h4>
                    <p className="text-sm text-gray-600">Various events throughout the year</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}