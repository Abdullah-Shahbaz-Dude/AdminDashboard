// components/UsersList.js
import { useEffect } from "react";
import useStore from "../store/store";
import { toast } from "react-toastify";

import "./css/user.css";

const UsersList = () => {
  const { users, setUsers } = useStore();
  console.log(users);

  const adminToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!adminToken) return; // stop if token not found

      try {
        const res = await fetch("http://localhost:5000/admin/users", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        const data = await res.json();
        setUsers(data.users || []); // always set an array
      } catch (err) {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [setUsers, adminToken]);

  if (!Array.isArray(users)) return <p>Loading users...</p>;

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    if (!adminToken) return toast.error("Admin not authenticated");

    try {
      const res = await fetch(`http://localhost:5000/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch (err) {
      toast.error("Error deleting user");
    }
  };
  return (
    <div className="users-container">
      <h2>All Users</h2>
      {users && users.length > 0 ? (
        users.map((user) => {
          const { _id, name, email, workbooks } = user;

          return (
            <div className="user-card" key={_id}>
              <div className="user-info">
                <p>
                  <span>{name}</span> - {email} ({workbooks?.length || 0}{" "}
                  Workbooks)
                </p>
                {workbooks && workbooks.length > 0 && (
                  <ul className="workbooks-list">
                    {workbooks.map((wb) => (
                      <li key={wb._id}>{wb.title}</li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="delete-btn" onClick={() => handleDelete(_id)}>
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};
export default UsersList;
