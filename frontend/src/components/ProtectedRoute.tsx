// Route guard that redirects unauthenticated users to the login page.
import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
