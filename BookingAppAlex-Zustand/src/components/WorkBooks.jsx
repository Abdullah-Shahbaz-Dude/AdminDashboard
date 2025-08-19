// components/WorkBooks.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import "./css/Workbooks.css";

const WorkBooks = () => {
  const [workbooks, setWorkbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWorkbooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/workbooks");
        const data = await response.json();
        setWorkbooks(data);
      } catch {
        toast.error("Failed to load workbooks");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkbooks();
  }, []);
  if (loading) return <ClipLoader color="#007bff" size={50} />;
  return (
    <div className="workbooks-container">
      <h1>All Workbooks</h1>
      <div className="workbooks-grid">
        {workbooks.map((wb) => (
          <div
            key={wb._id}
            className="workbook-card"
            onClick={() => navigate(`/workbook/${wb._id}`)}
          >
            <h3>{wb.title}</h3>
            <p>{wb.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WorkBooks;
