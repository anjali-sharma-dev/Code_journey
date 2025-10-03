import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { dsaTopics, coreSubjects, companies } from "../assets/assets";
import CoreTopic from "../components/CoreTopic";
import DsaTopic from "../components/DsaTopic.jsx";
import CompanyWise from "../components/CompanyWise";


const Home = () => {

  const dsaRef = useRef(null);
  const coreRef = useRef(null);
  const companyRef = useRef(null);

  const scroll = (direction, ref) => {
    const container = ref.current;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
    {/* hero_section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-center py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6">
          Master Data Structures <br className="md:hidden" /> & Algorithms
        </h1>
        <p className="text-gray-300 text-lg mb-6 px-3">
          This course is made for people who want to learn DSA from A to Z for free in a well-organized and structured manner.
          <span className="ml-2 inline-block text-cyan-400 hover:underline cursor-pointer">Know More</span>
        </p>

      </div>

      {/* content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* DSA Topics Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">Topics</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Master the essential data structures and algorithms that form the foundation of computer science
          </p>
          <div className="relative">
            <button
              onClick={() => scroll("left", dsaRef)}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800 shadow-md p-2 rounded-full"
            >
              <ChevronLeft className="text-cyan-400" />
            </button>
            <button
              onClick={() => scroll("right", dsaRef)}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800 shadow-md p-2 rounded-full"
            >
              <ChevronRight className="text-cyan-400" />
            </button>
            <div
              ref={dsaRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-6 py-4"
            >
              {dsaTopics.map((item, index) => (
                <DsaTopic key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Core Subjects Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">Core Subjects</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Master the essential computer science core concepts
          </p>
          <div className="relative">
            <button
              onClick={() => scroll("left", coreRef)}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800 shadow-md p-2 rounded-full"
            >
              <ChevronLeft className="text-cyan-400" />
            </button>
            <button
              onClick={() => scroll("right", coreRef)}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800 shadow-md p-2 rounded-full"
            >
              <ChevronRight className="text-cyan-400" />
            </button>
            <div
              ref={coreRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-6 py-4"
            >
              {coreSubjects.map((item, index) => (
                <CoreTopic key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">Companies</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Prepare company-specific interview problems and challenges
          </p>
          <div className="relative">
            <button
              onClick={() => scroll("left", companyRef)}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800 shadow-md p-2 rounded-full"
            >
              <ChevronLeft className="text-cyan-400" />
            </button>
            <button
              onClick={() => scroll("right", companyRef)}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800 shadow-md p-2 rounded-full"
            >
              <ChevronRight className="text-cyan-400" />
            </button>
            <div
              ref={companyRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-6 py-4"
            >
              {companies.map((item, index) => (
                <CompanyWise key={index} item={item} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Community Stats Section */}
      <div className="bg-cyan-500 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
        <p className="mb-8">Thousands of students are already mastering DSA with us</p>
        <div className="flex justify-between">
          <div>
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div>Active Learners</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div>Topics Covered</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">95%</div>
            <div>Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div>Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
