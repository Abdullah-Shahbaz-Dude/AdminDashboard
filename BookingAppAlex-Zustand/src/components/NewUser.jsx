// components/NewUser.js
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { toast } from "react-toastify";
import sanitizeHtml from "sanitize-html";

import "./css/NewUser.css";

const NewUser = () => {
  const { setUser, setUsers } = useStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const createUser = async (data) => {
    try {
      const sanitizedData = {
        name: sanitizeHtml(data.name),
        email: sanitizeHtml(data.email),
      };
      const response = await fetch(
        "http://localhost:5000/api/user-dashboard/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedData),
        }
      );
      const userData = await response.json();

      if (!userData.success) {
        // handles both "already exists" and other failures
        toast.error(userData.message || "User creation failed");
        return;
      }

      const newUser = userData.user;
      setUser(newUser);
      setUsers((prev) => [...prev, newUser]);
      toast.success("User created successfully!");
      navigate(`/assign-workbooks/${newUser._id}`);

      // console.log("UserData from backend:", userData);
    } catch {
      toast.error("Error creating user");
    }
  };
  return (
    <div className="new-user-container">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit(createUser)}>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="form-input"
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          placeholder="Email"
          className="form-input"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
        <button type="submit" className="submit-button">
          Create User
        </button>
      </form>
    </div>
  );
};
export default NewUser;
