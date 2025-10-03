import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import TopicSection from "../components/TopicSection";
import { topics as localTopics } from "../assets/data";
import ProgressCard from "../components/ProgressCard";

const Problem = () => {
  const { topicList, setTopics } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prepare enriched topics from mock data
    const enrichedTopics = localTopics.map((topic) => ({
      ...topic,
      questions: topic.questions.map((q) => ({
        id: q.id,
        questionName: q.title,
        solutionLink: q.link,
        plusResource: q.resourcePlus || "-",
        freeResource: q.resourceFree || "-",
        level: q.difficulty,
        company: q.company,
        solved: q.status === "solved",
        starred: q.starred || false,
      })),
    }));

    setTopics(enrichedTopics);
    setLoading(false);
  }, [setTopics]);

  const calculateStats = () => {
    if (!topicList || topicList.length === 0)
      return {
        total: 0,
        solved: 0,
        easy: { total: 0, solved: 0 },
        medium: { total: 0, solved: 0 },
        hard: { total: 0, solved: 0 },
      };

    const stats = {
      total: 0,
      solved: 0,
      easy: { total: 0, solved: 0 },
      medium: { total: 0, solved: 0 },
      hard: { total: 0, solved: 0 },
    };

    topicList.forEach((topic) => {
      topic.questions.forEach((q) => {
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
    <div className="min-h-screen bg-[#0f172a] text-white  py-6">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-10 text-cyan-400">
            <p className="text-lg">Loading problems...</p>
          </div>
        ) : (
          <>
            {/* Progress Cards */}
            <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4 mb-6 bg-[#1e293b] rounded-xl shadow-sm py-4">
              <div className="flex flex-col items-center">
                <span className="text-lg font-semibold text-cyan-400">
                  {stats.solved} / {stats.total}
                </span>
                <span className="text-sm text-gray-400">Total Progress</span>
              </div>
              <div className="flex justify-around gap-4">
                <ProgressCard
                  label="Easy"
                  value={stats.easy.solved}
                  total={stats.easy.total}
                />
                <ProgressCard
                  label="Medium"
                  value={stats.medium.solved}
                  total={stats.medium.total}
                />
                <ProgressCard
                  label="Hard"
                  value={stats.hard.solved}
                  total={stats.hard.total}
                />
              </div>
            </div>

            {/* Topics */}
            <div className="border-2 border-gray-800 px-4 rounded-xl shadow-xl">
              <div className="space-y-4">
                {topicList.map((topic, idx) => (
                  <TopicSection key={idx} topic={topic} />
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
