import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./css/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   console.log("AdminLogin: Component rendered");
  //   console.log("Initial localStorage token:", localStorage.getItem("token"));
  // }, []);

  const handleSubmitForm = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        if (!result.token) {
          toast.error("Login failed: No token received");
          return;
        }
        localStorage.setItem("token", result.token);

        toast.success("Login successful! Redirecting...");
        navigate("/dashboard"); // Immediate redirect
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Network error in login:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      toast.error(`Network error: ${error.message}. Please check the server.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-group">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            placeholder="Email"
            className="form-input"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="form-input"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
export default AdminLogin;
