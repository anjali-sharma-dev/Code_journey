import React, { useState } from "react";
import LevelSection from "./Level";

const TopicSection = ({ topic = {} }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Ensure topic and questions are properly structured
  const questions = Array.isArray(topic.questions) ? topic.questions : [];

  const groupedQuestions = {
    Easy: questions.filter((q) => q.level === "Easy"),
    Medium: questions.filter((q) => q.level === "Medium"),
    Hard: questions.filter((q) => q.level === "Hard"),
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-left"
      >
        <span className="text-xl font-bold">{topic.name}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="space-y-6 mt-4">
          {["Easy", "Medium", "Hard"].map((level) =>
            groupedQuestions[level].length > 0 ? (
              <LevelSection key={level} level={level} questions={groupedQuestions[level]} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default TopicSection;