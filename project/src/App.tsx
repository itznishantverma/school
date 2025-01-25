import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Admission } from './pages/Admission';
import { Academic } from './pages/Academic';
import { Faculty } from './pages/Faculty';
import { Courses } from './pages/Courses';
import { Contact } from './pages/Contact';
import { Announcements } from './pages/Announcements';
import { Events } from './pages/Events';
import { Support } from './pages/Support';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { TeacherDashboard } from './pages/dashboards/TeacherDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { ParentDashboard } from './pages/dashboards/ParentDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/academic" element={<Academic />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/events" element={<Events />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard">
                <Route 
                  path="student" 
                  element={
                    <ProtectedRoute role="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="teacher" 
                  element={
                    <ProtectedRoute role="teacher">
                      <TeacherDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="admin" 
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="parent" 
                  element={
                    <ProtectedRoute role="parent">
                      <ParentDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Route>
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;