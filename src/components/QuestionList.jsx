import React from "react";

const QuestionList = ({ questions = [] }) => {
  if (!questions.length) {
    return (
      <tr>
        <td colSpan="6" className="py-4 text-center text-gray-500">
          No questions available
        </td>
      </tr>
    );
  }

  return (
    <>
      {questions.map((q, idx) => (
        <tr
          key={idx}
          className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
        >
          <td className="py-2 px-4">
            <input type="checkbox" className="w-4 h-4 accent-[#00b8a3]" />
          </td>
          <td className="py-2 px-4 text-gray-200 font-bold cursor-pointer hover:underline">
            {q.questionName}
          </td>
          <td className="py-2 px-4 text-center">
            <a href={q.solutionLink} target="_blank" rel="noopener noreferrer">
              <span className="px-2 py-1 rounded text-xs text-white bg-[#00b8a3]">
                🎥
              </span>
            </a>
          </td>
          <td className="py-2 px-4 text-center text-gray-400">{q.notes || "-"}</td>
          <td className="py-2 px-4 text-center text-gray-400">☆</td>
          <td
            className={`py-2 px-4 font-medium ${
              q.level === "Easy"
                ? "text-green-400"
                : q.level === "Medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {q.level}
          </td>
        </tr>
      ))}
    </>
  );
};

export default QuestionList;
