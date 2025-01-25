import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
  };

  // Only return dashboard link if user is logged in and has a valid role
  const getDashboardLink = () => {
    if (!user || !userRole) return null;
    return `/dashboard/${userRole}`;
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <span className="font-bold text-xl">EduExcel Academy</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/about" className="hover:text-blue-200">About Us</Link>
            <Link to="/admission" className="hover:text-blue-200">Admission</Link>
            <Link to="/academic" className="hover:text-blue-200">Academic</Link>
            <Link to="/faculty" className="hover:text-blue-200">Faculty</Link>
            <Link to="/courses" className="hover:text-blue-200">Courses</Link>
            {user ? (
              <>
                {dashboardLink && (
                  <Link 
                    to={dashboardLink} 
                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-white hover:text-blue-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 hover:bg-blue-700 rounded-md">Home</Link>
            <Link to="/about" className="block px-3 py-2 hover:bg-blue-700 rounded-md">About Us</Link>
            <Link to="/admission" className="block px-3 py-2 hover:bg-blue-700 rounded-md">Admission</Link>
            <Link to="/academic" className="block px-3 py-2 hover:bg-blue-700 rounded-md">Academic</Link>
            <Link to="/faculty" className="block px-3 py-2 hover:bg-blue-700 rounded-md">Faculty</Link>
            <Link to="/courses" className="block px-3 py-2 hover:bg-blue-700 rounded-md">Courses</Link>
            {user ? (
              <>
                {dashboardLink && (
                  <Link 
                    to={dashboardLink}
                    className="block px-3 py-2 bg-white text-blue-600 rounded-md"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 hover:bg-blue-700 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 bg-white text-blue-600 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}