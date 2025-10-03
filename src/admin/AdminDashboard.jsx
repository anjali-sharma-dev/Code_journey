import React, { useEffect, useState } from "react";
import { Users, FileText, Database } from "lucide-react";
import { topics } from "../assets/data";
import { users } from "../assets/user";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: { total: 0, active: 0, new: 0 },
    topics: { total: 0 },
    questions: { total: 0, easy: 0, medium: 0, hard: 0 },
    progress: { solved: 0, total: 0 },
  });

  useEffect(() => {
    let totalQuestions = 0;
    let easy = 0;
    let medium = 0;
    let hard = 0;
    let solved = 0;

    topics.forEach((topic) => {
      totalQuestions += topic.questions.length;
      easy += topic.questions.filter((q) => q.difficulty === "Easy").length;
      medium += topic.questions.filter((q) => q.difficulty === "Medium").length;
      hard += topic.questions.filter((q) => q.difficulty === "Hard").length;
      solved += topic.questions.filter((q) => q.status === "solved").length;
    });

    setStats({
      users: { total: users.length, active: users.length, new: 0 },
      topics: { total: topics.length },
      questions: { total: totalQuestions, easy, medium, hard },
      progress: { solved, total: totalQuestions },
    });
  }, []);

  const calculatePercentage = (value, total) => (total ? Math.round((value / total) * 100) : 0);

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard icon={<Users className="h-8 w-8 text-cyan-500" />} title="Users" value={stats.users.total} />
        <StatsCard icon={<Database className="h-8 w-8 text-cyan-500" />} title="Topics" value={stats.topics.total} />
        <StatsCard
          icon={<FileText className="h-8 w-8 text-cyan-500" />}
          title="Questions"
          value={stats.questions.total}
          details={
            <div className="flex space-x-2 text-sm text-gray-400 mt-1">
              <span className="text-green-400">Easy: {stats.questions.easy}</span>
              <span className="text-yellow-400">Medium: {stats.questions.medium}</span>
              <span className="text-red-400">Hard: {stats.questions.hard}</span>
            </div>
          }
        />
      </div>

      {/* Solved Questions Progress */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Solved Questions Progress</h2>
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
          <div
            className="bg-cyan-500 h-4 rounded-full transition-all"
            style={{ width: `${calculatePercentage(stats.progress.solved, stats.progress.total)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {stats.progress.solved} / {stats.progress.total} solved (
          {calculatePercentage(stats.progress.solved, stats.progress.total)}%)
        </p>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, details }) => (
  <div className="bg-gray-800 rounded-lg shadow p-6 flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
      {details}
    </div>
  </div>
);

export default AdminDashboard;
