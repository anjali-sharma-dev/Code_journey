import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
} from "lucide-react";
import { topics as mockTopics } from "../assets/data";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTopic, setFilterTopic] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  useEffect(() => {
    // Flatten questions from topics
    const allQuestions = mockTopics.flatMap((topic) =>
      topic.questions.map((q) => ({
        ...q,
        topicId: topic.id,
        topicName: topic.name,
      }))
    );

    setTopics(mockTopics);
    setQuestions(allQuestions);
    setLoading(false);
  }, []);

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = filterTopic === "all" || q.topicId === filterTopic;
    const matchesDifficulty =
      filterDifficulty === "all" || q.difficulty === filterDifficulty;
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  const handleSaveQuestion = (q) => {
    if (selectedQuestion) {
      setQuestions((prev) =>
        prev.map((item) => (item.id === selectedQuestion.id ? q : item))
      );
    } else {
      setQuestions((prev) => [...prev, { ...q, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Question Management</h1>

      {/* Filters + Add */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-100"
            />
          </div>

          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Topics</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <button
          className="bg-cyan-500 text-gray-100 px-4 py-2 rounded-lg flex items-center hover:bg-cyan-600 transition-colors"
          onClick={() => {
            setSelectedQuestion(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Question
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No questions found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left">Question</th>
                <th className="px-6 py-3 text-left">Topic</th>
                <th className="px-6 py-3 text-left">Difficulty</th>
                <th className="px-6 py-3 text-left">Solved/Attempted</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredQuestions.map((q) => {
                const progress = q.attempted ? (q.solved / q.attempted) * 100 : 0;
                return (
                  <tr key={q.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-gray-100">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{q.title}</div>
                        <div className="text-sm text-gray-400 truncate max-w-md">
                          {q.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{q.topicName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          q.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : q.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {q.solved} / {q.attempted}
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div
                          className="bg-cyan-500 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5 text-blue-500 hover:text-blue-400" />
                      </a>
                      <button onClick={() => { setSelectedQuestion(q); setIsModalOpen(true); }}>
                        <Edit className="h-5 w-5 text-indigo-500 hover:text-indigo-400" />
                      </button>
                      <button onClick={() => handleDeleteQuestion(q.id)}>
                        <Trash2 className="h-5 w-5 text-red-500 hover:text-red-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <QuestionModal
          topics={topics}
          question={selectedQuestion}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveQuestion}
        />
      )}
    </div>
  );
};

// Modal Component
const QuestionModal = ({ question, topics, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: question?.title || "",
    description: question?.description || "",
    difficulty: question?.difficulty || "Medium",
    topicId: question?.topicId || (topics[0]?.id || ""),
    link: question?.link || "",
    solved: question?.solved || 0,
    attempted: question?.attempted || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const topicName = topics.find((t) => t.id === formData.topicId)?.name || "";
    onSave({ ...formData, topicName, id: question?.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl text-gray-100">
        <h2 className="text-xl font-bold mb-4">
          {question ? "Edit Question" : "Add Question"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-300">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-300">Topic</label>
              <select
                name="topicId"
                value={formData.topicId}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-300">Link</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="flex gap-2">
              <div>
                <label className="block mb-1 text-gray-300">Solved</label>
                <input
                  type="number"
                  name="solved"
                  value={formData.solved}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-300">Attempted</label>
                <input
                  type="number"
                  name="attempted"
                  value={formData.attempted}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-gray-100 rounded hover:bg-cyan-600"
            >
              {question ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questions;
