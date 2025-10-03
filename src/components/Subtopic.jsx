import React, { useState } from "react";
import QuestionList from "./QuestionList";

const Subtopic = ({ level, questions }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="ml-4 mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-left text-green-400"
      >
        <span className="text-lg font-semibold">{level} Questions</span>
        <span className="text-sm text-gray-400">
          {questions.length} / {questions.length}
        </span>
      </button>

      {isOpen && (
        <div className="bg-gray-900 rounded-lg overflow-hidden mt-2 border border-gray-700 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-gray-200">
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
              <QuestionList questions={questions} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subtopic;
