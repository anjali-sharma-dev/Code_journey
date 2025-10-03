import React, { useState } from "react";
import { Search, Plus, MessageSquare, Eye, TrendingUp } from "lucide-react";

const Interview = () => {
  // Dummy data
  const interviews = [
    {
      id: 1,
      title: "My Amazon Interview Experience",
      role: "Backend",
      desc: "I was asked system design and DSA questions. Here's how I approached each round...",
      comments: 12,
      views: 340,
    },
    {
      id: 2,
      title: "Frontend Role at Google",
      role: "Frontend",
      desc: "The interview focused heavily on React, performance optimization, and JS fundamentals...",
      comments: 8,
      views: 220,
    },
    {
      id: 3,
      title: "Full Stack at Microsoft",
      role: "Full Stack",
      desc: "The panel asked about API design, database scaling, and some React state management...",
      comments: 15,
      views: 410,
    },
  ];

  // State for filters/sorting
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [search, setSearch] = useState("");

  // Filter + sort logic
  const filtered = interviews
    .filter((item) => (roleFilter === "All" ? true : item.role === roleFilter))
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortBy === "Popular" ? b.views - a.views : b.id - a.id));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <div className="bg-gray-900 border-b border-cyan-700 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Interview</h1>
              <p className="text-cyan-100 mt-1">
                Tips, experiences, and preparation strategies
              </p>
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search interviews..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-cyan-600 rounded-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gray-900 border border-cyan-700 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-cyan-400 mb-6">Filters</h3>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-cyan-300 mb-3">Role</h4>
                <div className="space-y-2">
                  {["All", "Frontend", "Backend", "Full Stack"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(role)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                        roleFilter === role
                          ? "bg-cyan-600 text-white"
                          : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full bg-cyan-600 text-white px-4 py-3 rounded-md font-medium hover:bg-cyan-500 transition flex items-center justify-center space-x-2 shadow-md">
                <Plus className="w-4 h-4" />
                <span>Share Experience</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-900 border border-cyan-700 rounded-lg shadow-lg mb-4">
              <div className="px-6 py-4 border-b border-cyan-700 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-cyan-400">
                    Interview Stories ({filtered.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-400">Trending</span>
                  </div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-900 border border-cyan-600 text-sm text-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option>Latest</option>
                  <option>Popular</option>
                </select>
              </div>

              {/* Stories List */}
              <div className="divide-y divide-gray-800">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      className="px-6 py-6 hover:bg-gray-800 transition"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md">
                          {item.title[0]}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-100 hover:text-cyan-400 cursor-pointer mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                            {item.desc}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4 text-cyan-400" />
                              <span>{item.comments}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-cyan-400" />
                              <span>{item.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-6">
                    No stories found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
