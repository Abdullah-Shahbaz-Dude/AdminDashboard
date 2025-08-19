// components/WorkbookForm.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./css/workbookForm.css";

const WorkbookForm = ({ workbook, submitUrl, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  useEffect(() => {
    if (workbook) {
      const initialAnswers = {};
      workbook.questions.forEach((_, i) => {
        initialAnswers[i] = "";
      });
      setAnswers(initialAnswers);
    }
  }, [workbook]);
  const handleChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workbookId: workbook?._id,
          answers: Object.entries(answers).map(([index, answer]) => ({
            questionIndex: Number(index),
            answer,
          })),
        }),
      });
      if (response.ok) {
        toast.success("Answers submitted!");
        onSubmit?.();
      } else {
        toast.error("Submission failed.");
      }
    } catch {
      toast.error("Error submitting answers.");
    }
  };
  if (!workbook) return <div>Loading...</div>;
  return (
    <div className="workbook-form">
      <h1>{workbook.title}</h1>
      <p>{workbook.description}</p>
      <form onSubmit={handleSubmit}>
        {workbook.questions.map((q, idx) => (
          <div key={idx} className="question-container">
            <label htmlFor={`question-${idx}`} className="question-label">
              {q.question || q.text}
            </label>
            <input
              type={q.answerType === "number" ? "number" : "text"}
              id={`question-${idx}`}
              value={answers[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="question-input"
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit Answers
        </button>
      </form>
    </div>
  );
};
export default WorkbookForm;
