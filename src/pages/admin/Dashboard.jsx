import React, { useEffect, useState } from "react";
import { BarChart2, Users, FileText, Database, ArrowUp, ArrowDown } from "lucide-react";
import problemService from "../../services/problemService";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: { total: 0, active: 0, new: 0 },
    topics: { total: 0 },
    questions: { total: 0, easy: 0, medium: 0, hard: 0 },
    progress: { solved: 0, total: 0 }
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch topics
        const topics = await problemService.getTopics();
        
        // Calculate question stats
        let totalQuestions = 0;
        let easyQuestions = 0;
        let mediumQuestions = 0;
        let hardQuestions = 0;
        let solvedQuestions = 0;
        
        // Process each topic to get question counts
        for (const topic of topics) {
          const levels = ["Easy", "Medium", "Hard"];
          
          for (const level of levels) {
            const questions = await problemService.getQuestionsByTopicAndLevel(topic._id, level);
            const questionList = Array.isArray(questions) ? questions : (questions?.message || []);
            
            totalQuestions += questionList.length;
            
            if (level === "Easy") {
              easyQuestions += questionList.length;
            } else if (level === "Medium") {
              mediumQuestions += questionList.length;
            } else if (level === "Hard") {
              hardQuestions += questionList.length;
            }
            
            // Count solved questions
            solvedQuestions += questionList.filter(q => q.solved).length;
          }
        }
        
        // Update stats
        setStats({
          users: { total: 120, active: 85, new: 12 }, // Mock data for users
          topics: { total: topics.length },
          questions: { 
            total: totalQuestions, 
            easy: easyQuestions, 
            medium: mediumQuestions, 
            hard: hardQuestions 
          },
          progress: { solved: solvedQuestions, total: totalQuestions }
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate percentages
  const calculatePercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b8a3]"></div>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Users card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.users.total}</h3>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">+{stats.users.new} new</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>
            
            {/* Topics card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Topics</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.topics.total}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Database className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>
            
            {/* Questions card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Questions</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.questions.total}</h3>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Easy: {stats.questions.easy}
                    </span>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      Medium: {stats.questions.medium}
                    </span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                      Hard: {stats.questions.hard}
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </div>
            
            {/* Progress card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {calculatePercentage(stats.progress.solved, stats.progress.total)}%
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">
                      {stats.progress.solved} / {stats.progress.total} solved
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <BarChart2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent activity and other dashboard content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {/* Activity items would go here */}
                <p className="text-gray-500 text-sm">No recent activity to display</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#00b8a3] text-white py-2 px-4 rounded-lg hover:bg-[#00a693] transition-colors">
                  Add New Topic
                </button>
                <button className="bg-[#00b8a3] text-white py-2 px-4 rounded-lg hover:bg-[#00a693] transition-colors">
                  Add New Question
                </button>
                <button className="bg-[#00b8a3] text-white py-2 px-4 rounded-lg hover:bg-[#00a693] transition-colors">
                  Manage Users
                </button>
                <button className="bg-[#00b8a3] text-white py-2 px-4 rounded-lg hover:bg-[#00a693] transition-colors">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;