import React, { useState, useEffect } from "react";
import { Database, Plus, Edit, Trash2, Search } from "lucide-react";
import problemService from "../../services/problemService";

/**
 * AdminTopics component
 * 
 * This component displays and manages DSA topics in the admin panel.
 */
const AdminTopics = () => {
  // State for topics data
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const topicList = await problemService.getTopics();
        setTopics(topicList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", error);
        // Fallback to mock data if API fails
        const mockTopics = [
          {
            _id: "1",
            name: "Arrays",
            description: "Basic and advanced array operations and algorithms",
            questionCount: 25,
            difficulty: "Medium"
          },
          {
            _id: "2",
            name: "Linked Lists",
            description: "Singly and doubly linked list implementations and problems",
            questionCount: 18,
            difficulty: "Medium"
          },
          {
            _id: "3",
            name: "Trees",
            description: "Binary trees, BST, AVL trees and related algorithms",
            questionCount: 22,
            difficulty: "Hard"
          },
          {
            _id: "4",
            name: "Graphs",
            description: "Graph representations and algorithms like BFS, DFS, Dijkstra",
            questionCount: 20,
            difficulty: "Hard"
          },
          {
            _id: "5",
            name: "Dynamic Programming",
            description: "DP approach to solving optimization problems",
            questionCount: 30,
            difficulty: "Hard"
          },
          {
            _id: "6",
            name: "Sorting",
            description: "Various sorting algorithms and their implementations",
            questionCount: 15,
            difficulty: "Easy"
          }
        ];
        setTopics(mockTopics);
        setLoading(false);
      }
    };
    
    fetchTopics();
  }, []);
  
  // Filter topics based on search term
  const filteredTopics = topics.filter(topic => 
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle topic edit
  const handleEditTopic = (topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };
  
  // Handle topic delete
  const handleDeleteTopic = (topicId) => {
    if (window.confirm("Are you sure you want to delete this topic? This will also delete all associated questions.")) {
      // In a real app, you would call an API to delete the topic
      setTopics(topics.filter(topic => topic._id !== topicId));
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Topic Management</h1>
      
      {/* Search and Add Topic */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
          />
        </div>
        
        <button 
          className="bg-[#00b8a3] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#00a693] transition-colors"
          onClick={() => {
            setSelectedTopic(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Topic
        </button>
      </div>
      
      {/* Topics Table */}
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
                  Topic Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTopics.map((topic) => (
                <tr key={topic._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#00b8a3] flex items-center justify-center text-white">
                        <Database className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{topic.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md truncate">{topic.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {topic.questionCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      topic.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                      topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {topic.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEditTopic(topic)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTopic(topic._id)}
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
      
      {/* Topic Modal - In a real app, you would implement this modal for adding/editing topics */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedTopic ? 'Edit Topic' : 'Add New Topic'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                  defaultValue={selectedTopic?.name || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                  rows="3"
                  defaultValue={selectedTopic?.description || ''}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                  defaultValue={selectedTopic?.difficulty || 'Medium'}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
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
                  {selectedTopic ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTopics;