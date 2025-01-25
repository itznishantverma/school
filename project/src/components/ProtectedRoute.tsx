import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'student' | 'teacher' | 'admin' | 'parent';
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no user or no role, redirect to login
  if (!user || !userRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user has wrong role, redirect to login with invalidRole flag
  if (userRole !== role) {
    return <Navigate to="/login" state={{ from: location, invalidRole: true }} replace />;
  }

  return <>{children}</>;
}