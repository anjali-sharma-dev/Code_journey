import React, { useState, useEffect } from "react";
import { Database, Plus, Edit, Trash2, Search } from "lucide-react";
import { topics as mockTopics } from "../assets/data";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load topics
  useEffect(() => {
    setLoading(true);
    setTopics(mockTopics);
    setLoading(false);
  }, []);

  const filteredTopics = topics.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveTopic = (topic) => {
    if (selectedTopic) {
      setTopics((prev) =>
        prev.map((t) => (t.id === selectedTopic.id ? { ...t, ...topic } : t))
      );
    } else {
      const newTopic = { ...topic, id: Date.now().toString() };
      setTopics((prev) => [...prev, newTopic]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTopic = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this topic? This will also delete all associated questions."
      )
    ) {
      setTopics((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Topics</h1>

      {/* Search + Add */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <button
          className="bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-cyan-400 transition-colors"
          onClick={() => {
            setSelectedTopic(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Topic
        </button>
      </div>

      {/* Topics Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-gray-800 p-6 rounded-xl min-w-[250px] flex-shrink-0 shadow-lg hover:shadow-cyan-500 transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-cyan-400 mr-3" />
                <h2 className="text-xl font-bold">{topic.name}</h2>
              </div>
              <p className="text-gray-300 mb-4 truncate">{topic.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">
                  Questions: {topic.questions?.length || 0}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    topic.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : topic.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {topic.difficulty || "Medium"}
                </span>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setSelectedTopic(topic);
                    setIsModalOpen(true);
                  }}
                  className="text-cyan-400 hover:text-cyan-200"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteTopic(topic.id)}
                  className="text-red-500 hover:text-red-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 text-gray-100 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedTopic ? "Edit Topic" : "Add New Topic"}
            </h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const topic = {
                  name: form.name.value,
                  description: form.description.value,
                  difficulty: form.difficulty.value,
                  questions: selectedTopic?.questions || [],
                };
                handleSaveTopic(topic);
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-1">Topic Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={selectedTopic?.name || ""}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedTopic?.description || ""}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  defaultValue={selectedTopic?.difficulty || "Medium"}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                  className="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-white"
                >
                  {selectedTopic ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topics;
