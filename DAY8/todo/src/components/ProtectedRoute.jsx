import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // If user not found, redirect to signin
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the child component (e.g., Todo)
  return children;
}
