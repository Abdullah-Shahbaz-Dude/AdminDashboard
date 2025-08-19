// components/WorkbookViewer.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkbookForm from "./WorkbookForm";
const WorkbookViewer = () => {
  const { token, workbookId } = useParams();
  const [workbook, setWorkbook] = useState(null);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/user-dashboard/workbook/${token}/${workbookId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setWorkbook(data.workbook);
        else toast.error(data.message || "Failed to load workbook");
      })
      .catch(() => toast.error("Error fetching workbook"));
  }, [token, workbookId]);
  return (
    <WorkbookForm
      workbook={workbook}
      submitUrl={`http://localhost:5000/api/workbooks/forms/${workbook?._id}/submit`}
    />
  );
};
export default WorkbookViewer;
