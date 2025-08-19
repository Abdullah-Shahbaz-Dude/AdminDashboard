import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser, setLinkVisible } = useStore();

  const handleLogout = () => {
    setUser(null); // remove user from state
    setLinkVisible(false); // hide user link
    localStorage.removeItem("token"); // optional: remove token if stored
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
