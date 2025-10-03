import React from "react";
import {
  Search,
  Plus,
  TrendingUp,
  ThumbsUp,
  MessageCircle,
  Eye,
} from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <div className="bg-gray-900 border-b border-cyan-700 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog</h1>
              <p className="text-cyan-100 mt-1">Community Blogions and solutions</p>
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Blogions..."
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
                <h4 className="text-sm font-medium text-cyan-300 mb-3">Category</h4>
                <div className="space-y-2">
                  {["All Categories", "Algorithms", "System Design"].map((cat) => (
                    <button
                      key={cat}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-cyan-300 mb-3">Sort By</h4>
                <div className="space-y-2">
                  {["Latest", "Popular"].map((sort) => (
                    <button
                      key={sort}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition"
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-cyan-600 text-white px-4 py-3 rounded-md font-medium hover:bg-cyan-500 transition flex items-center justify-center space-x-2 shadow-md">
                <Plus className="w-4 h-4" />
                <span>Create Post</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-900 border border-cyan-700 rounded-lg shadow-lg mb-4">
              <div className="px-6 py-4 border-b border-cyan-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold text-cyan-400">
                      Blogions (3)
                    </h2>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-gray-400">Trending</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Sort by:</span>
                    <select className="bg-gray-900 border border-cyan-600 text-sm text-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                      <option>Latest</option>
                      <option>Popular</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Posts List */}
              <div className="divide-y divide-gray-800">
                {[1, 2, 3].map((id) => (
                  <div
                    key={id}
                    className="px-6 py-6 hover:bg-gray-800 transition"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md">
                        A
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-200">
                            Author Name
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">2h ago</span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-900 text-cyan-300">
                            Algorithms
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-100 hover:text-cyan-400 cursor-pointer mb-2">
                          How to solve XYZ problem efficiently
                        </h3>

                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          This post explains a clean approach to solving XYZ
                          using binary search and prefix sums...
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4 text-cyan-400" />
                            <span>24</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4 text-cyan-400" />
                            <span>5</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-cyan-400" />
                            <span>120</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
