import React, { useState } from "react";
import Subtopic from "./Subtopic";

const Topic = ({ topic }) => {
  const [isOpen, setIsOpen] = useState(true);

  const groupedQuestions = {
    Easy: topic.questions.filter((q) => q.level === "Easy"),
    Medium: topic.questions.filter((q) => q.level === "Medium"),
    Hard: topic.questions.filter((q) => q.level === "Hard"),
  };

  return (
    <div className="mb-6 border-b-1 shadow-lg py-2 border-gray-600">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between  items-center py-2 text-left text-xl font-bold text-gray-200"
      >
        <span>{topic.name}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="space-y-6 mt-4">
          {["Easy", "Medium", "Hard"].map(
            (level) =>
              groupedQuestions[level].length > 0 && (
                <Subtopic
                  key={level}
                  level={level}
                  questions={groupedQuestions[level]}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Topic;
