// components/WorkbookDetail.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkbookForm from "./WorkbookForm";
const WorkbookDetail = () => {
  const { id } = useParams();
  const [workbook, setWorkbook] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/api/workbooks/${id}`)
      .then((res) => res.json())
      .then((data) => setWorkbook(data))
      .catch(() => toast.error("Failed to load workbook"));
  }, [id]);
  return (
    <WorkbookForm
      workbook={workbook}
      submitUrl={`http://localhost:5000/api/workbooks/${id}/submit`}
    />
  );
};
export default WorkbookDetail;
