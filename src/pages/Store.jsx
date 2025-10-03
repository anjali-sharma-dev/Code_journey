import React from "react";
import { Search, ShoppingCart, Star, Tag } from "lucide-react";

const Store = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <div className="bg-gray-900 border-b border-cyan-700 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">Store</h1>
              <p className="text-cyan-100 mt-1">Buy premium content & resources</p>
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-cyan-600 rounded-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gray-900 border border-cyan-700 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-cyan-400 mb-6">Categories</h3>
              <div className="space-y-2">
                {["Ebooks", "Courses", "Problem Sets", "Templates"].map((cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div
                key={id}
                className="bg-gray-900 border border-cyan-700 rounded-lg hover:border-cyan-500 transition overflow-hidden shadow-md"
              >
                <div className="p-5 space-y-4">
                  {/* Product Image */}
                  <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Tag className="w-12 h-12 text-cyan-400" />
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-1">
                      Product #{id}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      Short description about this product
                    </p>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-cyan-400 font-semibold text-lg mb-4">
                      ₹499
                    </p>

                    {/* Add to Cart */}
                    <button className="w-full bg-cyan-600 text-white px-4 py-2 rounded-md font-medium hover:bg-cyan-500 transition flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
