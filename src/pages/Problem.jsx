import React, { useEffect, useState } from "react";
import ProgressCard from "../components/problem/ProgressCard";
import TopicSection from "../components/problem/Topic";
import { getTopics, getQuestionsByTopicAndLevel } from "../utils/api";

const Problem = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        // Step 1: Fetch all topics
        const topicList = await getTopics();

        // Step 2: Fetch questions for each topic and level
        const enrichedTopics = await Promise.all(
          topicList.map(async (topic) => {
            const levels = ["Easy", "Medium", "Hard"];
            const id = topic._id;
            
            // Fetch questions for each level
            const levelPromises = levels.map((level) =>
              getQuestionsByTopicAndLevel(id, level)
            );

            const responses = await Promise.all(levelPromises);
            
            // Flatten and combine all questions, ensuring default values for solved and starred
            const questions = responses.flatMap((res) => {
              // Handle different response structures
              const questionList = Array.isArray(res) ? res : (res?.message || []);
              
              // Ensure each question has solved and starred properties
              return questionList.map(q => ({
                ...q,
                solved: q.solved || false,
                starred: q.starred || false
              }));
            });
            
            return { ...topic, questions };
          })
        );

        // Step 3: Update state with enriched topics
        setTopics(enrichedTopics);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching topics or questions:", err);
        setError("Failed to load problems. Please try again later.");
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Calculate progress statistics
  const calculateStats = () => {
    if (!topics.length) return { total: 0, solved: 0, easy: { total: 0, solved: 0 }, medium: { total: 0, solved: 0 }, hard: { total: 0, solved: 0 } };
    
    const stats = {
      total: 0,
      solved: 0,
      easy: { total: 0, solved: 0 },
      medium: { total: 0, solved: 0 },
      hard: { total: 0, solved: 0 }
    };
    
    topics.forEach(topic => {
      topic.questions.forEach(q => {
        stats.total++;
        if (q.solved) stats.solved++;
        
        if (q.level === "Easy") {
          stats.easy.total++;
          if (q.solved) stats.easy.solved++;
        } else if (q.level === "Medium") {
          stats.medium.total++;
          if (q.solved) stats.medium.solved++;
        } else if (q.level === "Hard") {
          stats.hard.total++;
          if (q.solved) stats.hard.solved++;
        }
      });
    });
    
    return stats;
  };
  
  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg">Loading problems...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p className="text-lg">{error}</p>
          </div>
        ) : (
          <>
            {/* Progress Cards */}
            <div className="flex flex-col md:flex-row justify-center md:justify-between rounded-xl px-6 py-4 mb-6 bg-[#f9f9f9] shadow-sm">
              <div className="mb-4 md:mb-0">
                <ProgressCard label="Total Progress" value={stats.solved} total={stats.total} />
              </div>
              <div className="flex justify-center md:justify-between md:flex-row gap-4 items-center">
                <ProgressCard label="Easy" value={stats.easy.solved} total={stats.easy.total} />
                <ProgressCard label="Medium" value={stats.medium.solved} total={stats.medium.total} />
                <ProgressCard label="Hard" value={stats.hard.solved} total={stats.hard.total} />
              </div>
            </div>

            {/* Topics */}
            <div className="bg-[#f9f9f9] border rounded-lg shadow-sm border-gray-200 py-4 px-4 mb-6">
              <div className="space-y-4">
                {topics.map((topic, index) => (
                  <TopicSection key={index} topic={topic} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Problem;