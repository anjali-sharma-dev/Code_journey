import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { topics } from "../assets/data";

const TopicWiseQuestion = () => {
  const { name } = useParams(); // Get topic name from URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Find the topic matching the URL name
    const topic = topics.find(
      (t) => t.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    console.log("Searching for topic:", name);
    console.log("Found topic:", topic);

    if (!topic) {
      setError("Topic not found");
      setLoading(false);
      return;
    }

    // Set questions directly
    setQuestions(topic.questions);
    setLoading(false);
  }, [name]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-6 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-cyan-400 mb-6">{name}</h1>

        {loading && <p className="text-cyan-400">Loading questions...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && questions.length === 0 && (
          <p>No questions found for this topic.</p>
        )}

        <ul className="space-y-4">
          {questions.map((q) => (
            <li
              key={q.id} // Use question id
              className="bg-[#1e293b] p-4 rounded-lg shadow hover:bg-[#334155] transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{q.title}</h2>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    q.difficulty === "Easy"
                      ? "bg-green-600"
                      : q.difficulty === "Medium"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                >
                  {q.difficulty}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-300">Company: {q.company}</p>

              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {q.solveLink !== "-" && (
                  <a
                    href={q.solveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline"
                  >
                    Solve
                  </a>
                )}
                {q.resourcePlus !== "-" && (
                  <a
                    href={q.resourcePlus}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline"
                  >
                    Plus Resource
                  </a>
                )}
                {q.resourceFree !== "-" && (
                  <a
                    href={q.resourceFree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline"
                  >
                    Free Resource
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopicWiseQuestion;
