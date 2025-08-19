// components/UserManagement.js
import useStore from "../store/store";
import NewUser from "./NewUser";
import AssignWorkSheets from "./AssignWorkSheets";
import UserLink from "./UserLink";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserManagement = () => {
  const { user, linkVisible } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/new-user"); // redirect instead of conditional render
    else if (!linkVisible) navigate(`/assign-workbooks/${user._id}`);
  }, [user, linkVisible, navigate]);

  return null; // nothing to render here
};
export default UserManagement;
