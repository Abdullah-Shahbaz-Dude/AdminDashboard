import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/admin/validate", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        const data = await response.json();

        if ((response.ok && data.success) || data.valid) {
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          toast.error(data.message || "Session expired. Please log in again.");
          setIsValid(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          localStorage.removeItem("token");
          toast.error("Network error. Please try again.");
          setIsValid(false);
        }
      }
    };

    validateToken();

    return () => controller.abort();
  }, [token]);

  if (isValid === null)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#007bff" size={50} aria-label="Loading" />
      </div>
    );
  if (!isValid) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};
export default ProtectedRoute;
