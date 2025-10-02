import React, { useState, useEffect } from "react";
import { FileText, Plus, Edit, Trash2, Search, ExternalLink } from "lucide-react";
import problemService from "../../services/problemService";

/**
 * AdminQuestions component
 * 
 * This component displays and manages DSA questions in the admin panel.
 */
const AdminQuestions = () => {
  // State for questions data
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTopic, setFilterTopic] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  
  // Fetch topics and questions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch topics
        const topicList = await problemService.getTopics();
        setTopics(topicList);
        
        // Mock questions data
        const mockQuestions = [
          {
            _id: "1",
            title: "Two Sum",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            difficulty: "Easy",
            topicId: "1",
            topicName: "Arrays",
            link: "https://leetcode.com/problems/two-sum/",
            solved: 1250,
            attempted: 2000
          },
          {
            _id: "2",
            title: "Reverse Linked List",
            description: "Reverse a singly linked list.",
            difficulty: "Easy",
            topicId: "2",
            topicName: "Linked Lists",
            link: "https://leetcode.com/problems/reverse-linked-list/",
            solved: 980,
            attempted: 1500
          },
          {
            _id: "3",
            title: "Maximum Depth of Binary Tree",
            description: "Given the root of a binary tree, return its maximum depth.",
            difficulty: "Easy",
            topicId: "3",
            topicName: "Trees",
            link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            solved: 850,
            attempted: 1200
          },
          {
            _id: "4",
            title: "Merge Intervals",
            description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
            difficulty: "Medium",
            topicId: "1",
            topicName: "Arrays",
            link: "https://leetcode.com/problems/merge-intervals/",
            solved: 720,
            attempted: 1300
          },
          {
            _id: "5",
            title: "LRU Cache",
            description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
            difficulty: "Medium",
            topicId: "2",
            topicName: "Linked Lists",
            link: "https://leetcode.com/problems/lru-cache/",
            solved: 550,
            attempted: 1100
          },
          {
            _id: "6",
            title: "Word Search II",
            description: "Given an m x n board of characters and a list of strings words, return all words on the board.",
            difficulty: "Hard",
            topicId: "4",
            topicName: "Graphs",
            link: "https://leetcode.com/problems/word-search-ii/",
            solved: 320,
            attempted: 800
          },
          {
            _id: "7",
            title: "Longest Increasing Subsequence",
            description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
            difficulty: "Medium",
            topicId: "5",
            topicName: "Dynamic Programming",
            link: "https://leetcode.com/problems/longest-increasing-subsequence/",
            solved: 680,
            attempted: 1200
          }
        ];
        
        setQuestions(mockQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter questions based on search term, topic, and difficulty
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = filterTopic === "all" || question.topicId === filterTopic;
    const matchesDifficulty = filterDifficulty === "all" || question.difficulty === filterDifficulty;
    
    return matchesSearch && matchesTopic && matchesDifficulty;
  });
  
  // Handle question edit
  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };
  
  // Handle question delete
  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      // In a real app, you would call an API to delete the question
      setQuestions(questions.filter(question => question._id !== questionId));
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Question Management</h1>
      
      {/* Filters and Add Question */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
            />
          </div>
          
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
          >
            <option value="all">All Topics</option>
            {topics.map(topic => (
              <option key={topic._id} value={topic._id}>{topic.name}</option>
            ))}
          </select>
          
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        
        <button 
          className="bg-[#00b8a3] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#00a693] transition-colors"
          onClick={() => {
            setSelectedQuestion(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Question
        </button>
      </div>
      
      {/* Questions Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b8a3]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Solved/Attempted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuestions.map((question) => (
                <tr key={question._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#00b8a3] flex items-center justify-center text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{question.title}</div>
                        <div className="text-sm text-gray-500 max-w-md truncate">{question.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{question.topicName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                      question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {question.solved} / {question.attempted}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#00b8a3] h-2 rounded-full" 
                        style={{ width: `${(question.solved / question.attempted) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a 
                      href={question.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <button 
                      onClick={() => handleEditQuestion(question)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteQuestion(question._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Question Modal - In a real app, you would implement this modal for adding/editing questions */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedQuestion ? 'Edit Question' : 'Add New Question'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                  defaultValue={selectedQuestion?.title || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                  rows="4"
                  defaultValue={selectedQuestion?.description || ''}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                    defaultValue={selectedQuestion?.topicId || ''}
                  >
                    <option value="">Select a topic</option>
                    {topics.map(topic => (
                      <option key={topic._id} value={topic._id}>{topic.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                    defaultValue={selectedQuestion?.difficulty || 'Medium'}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  External Link
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                  defaultValue={selectedQuestion?.link || ''}
                  placeholder="https://leetcode.com/problems/example/"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#00b8a3] text-white rounded-md hover:bg-[#00a693]"
                  onClick={() => setIsModalOpen(false)}
                >
                  {selectedQuestion ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuestions;