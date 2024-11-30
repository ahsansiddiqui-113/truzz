import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (token) return children;

  return null; // Optionally, you could show a loading indicator here.
}

export default ProtectedRoute;
