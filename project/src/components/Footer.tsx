import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> (555) 123-4567</p>
              <p className="flex items-center"><Mail className="h-4 w-4 mr-2" /> info@eduexcel.edu</p>
              <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> 123 Education St, Learning City</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/admission" className="hover:text-blue-400">Admissions</a></li>
              <li><a href="/courses" className="hover:text-blue-400">Courses</a></li>
              <li><a href="/events" className="hover:text-blue-400">Events</a></li>
              <li><a href="/news" className="hover:text-blue-400">News</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/support" className="hover:text-blue-400">Support</a></li>
              <li><a href="/faq" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="/library" className="hover:text-blue-400">Library</a></li>
              <li><a href="/calendar" className="hover:text-blue-400">Academic Calendar</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-2">
              <p>Follow us on social media for updates and news.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-400">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} EduExcel Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}