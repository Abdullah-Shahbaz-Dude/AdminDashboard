// components/UserDashboard.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import "./css/Workbooks.css";

const UserDashboard = () => {
  const { token } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/api/user-dashboard/validate/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          toast.error(data.message || "Invalid or expired link!");
          navigate("/");
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error validating token");
        setLoading(false);
        navigate("/");
      });
  }, [token, navigate]);
  if (loading) return <ClipLoader color="#007bff" size={50} />;
  if (!user) return null;
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>You can now access your assigned workbooks below:</p>
      <div className="workbooks-container">
        {user.workbooks.length === 0 ? (
          <p>No workbooks assigned.</p>
        ) : (
          <div className="workbooks-grid">
            {user.workbooks.map((wb) => (
              <div key={wb._id}>
                <p>{wb.title}</p>
                <Link
                  to={`/user-dashboard/workbook/${token}/${wb._id}`}
                  className="workbook-link"
                >
                  Open Workbook
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserDashboard;
