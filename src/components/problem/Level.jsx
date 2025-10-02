import React from "react";
import QuestionRow from "./Question";
import { useState } from "react";

const LevelSection = ({ level, questions = [] }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Ensure questions is always an array and handle solved property safely
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const solvedCount = safeQuestions.filter(q => q.solved).length;

  return (
    <div className="ml-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-left"
      >
        <span className="text-lg font-semibold">{level} Questions</span>
        <span className="text-sm text-gray-500">
          {solvedCount} / {safeQuestions.length}
        </span>
      </button>

      {isOpen && (
        <div className="bg-[#f9f9f9] rounded-lg overflow-hidden mt-2 border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Problem</th>
                <th className="py-2 px-4">Solution</th>
                <th className="py-2 px-4">Notes</th>
                <th className="py-2 px-4">Revision</th>
                <th className="py-2 px-4">Level</th>
              </tr>
            </thead>
            <tbody>
              {safeQuestions.length > 0 ? (
                safeQuestions.map((q, idx) => (
                  <QuestionRow key={idx} question={q} />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No questions available for this level
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LevelSection;