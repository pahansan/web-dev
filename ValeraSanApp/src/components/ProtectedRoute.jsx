import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../services/api';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && getUserRole() !== 'Admin') {
    return <Navigate to="/valera" replace />;
  }

  return children;
}
