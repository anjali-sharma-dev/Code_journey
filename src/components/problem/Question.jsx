import React, { useState } from "react";
import { updateQuestionSolvedStatus, updateQuestionStarredStatus } from "../../utils/api";

const QuestionRow = ({ question }) => {
  const [checked, setChecked] = useState(question.solved || false);
  const [star, setStar] = useState(question.starred || false);
  const [updating, setUpdating] = useState(false);

  const handleSolvedToggle = async () => {
    if (updating) return;
    
    const newStatus = !checked;
    setChecked(newStatus);
    setUpdating(true);

    try {
      await updateQuestionSolvedStatus(question._id, newStatus);
    } catch (err) {
      console.error("Error updating solved status:", err);
      // Revert UI state if API call fails
      setChecked(!newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const handleStarToggle = async () => {
    if (updating) return;
    
    const newStatus = !star;
    setStar(newStatus);
    setUpdating(true);

    try {
      await updateQuestionStarredStatus(question._id, newStatus);
    } catch (err) {
      console.error("Error updating starred status:", err);
      // Revert UI state if API call fails
      setStar(!newStatus);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 px-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleSolvedToggle}
          className="w-4 h-4"
        />
      </td>
      <td className="py-2 px-4 text-gray-700 font-bold cursor-pointer hover:underline">
        {question.questionName}
      </td>
      <td className="py-2 px-4 text-center">
        <a href={question.solutionLink} target="_blank" rel="noopener noreferrer">
          <span className=" px-2 py-1 rounded text-xs text-white">🎥</span>
        </a>
      </td>
      <td className="py-2 px-4 text-center">{question.notes || "-"}</td>
      <td
        className="py-2 px-4 text-center cursor-pointer"
        onClick={handleStarToggle}
      >
        {star ? "⭐" : "☆"}
      </td>
      <td
        className={`py-2 px-4 font-medium ${
          question.level === "Easy"
            ? "text-green-600"
            : question.level === "Medium"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {question.level}
      </td>
    </tr>
  );
};

export default QuestionRow;