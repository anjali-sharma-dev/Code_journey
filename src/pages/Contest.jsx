import React from "react";
import { Search, Clock, Users } from "lucide-react";

const Contest = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-cyan-700 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">Contests</h1>
              <p className="text-gray-400 mt-1">Upcoming and past programming contests</p>
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search contests..."
                className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-[#334155] rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div
              key={id}
              className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:border-cyan-400 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                Weekly Contest #{id}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Solve coding problems & improve your skills
              </p>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-cyan-400" /> <span>2h 30m</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-cyan-400" /> <span>2.3k joined</span>
                </div>
              </div>
              <button className="w-full bg-cyan-400 text-[#0f172a] px-4 py-2 rounded-md font-medium hover:bg-cyan-300 transition">
                Join Contest
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-10">
          <button className="px-3 py-2 bg-[#1e293b] text-gray-300 hover:text-white hover:bg-[#334155] rounded-md transition">
            Previous
          </button>
          <button className="px-3 py-2 bg-cyan-400 text-[#0f172a] rounded-md hover:bg-cyan-300 transition">
            1
          </button>
          <button className="px-3 py-2 bg-[#1e293b] text-gray-300 hover:text-white hover:bg-[#334155] rounded-md transition">
            2
          </button>
          <button className="px-3 py-2 bg-[#1e293b] text-gray-300 hover:text-white hover:bg-[#334155] rounded-md transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contest;
