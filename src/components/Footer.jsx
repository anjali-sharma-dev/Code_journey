import React, { useState } from "react";
import { Code, Mail, ChevronDown, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: "Resources",
      items: ["Practice Problems", "Blog Articles", "Interview Prep", "Contests"],
    },
    {
      title: "Company",
      items: ["About Us", "Contact", "Careers"],
    },
    {
      title: "Legal",
      items: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-cyan-600 mt-auto text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            
            <p className="mt-2 text-sm text-gray-400">
              Your companion for mastering Data Structures and Algorithms.
            </p>
            <div className="flex mt-4 space-x-4">
              <div className="text-gray-400"><Github/></div>
              <div className="text-gray-400"><Twitter/></div>
              <div className="text-gray-400"><Linkedin/></div>
            </div>
          </div>

          {/* Collapsible sections for mobile */}
          {sections.map((section, idx) => (
            <div key={idx}>
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between text-sm font-semibold text-gray-200 uppercase tracking-wider md:cursor-default"
              >
                {section.title}
                <ChevronDown
                  className={`h-4 w-4 md:hidden transform transition-transform ${
                    openSection === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`mt-2 space-y-2 md:mt-4 ${
                  openSection === idx ? "block" : "hidden md:block"
                }`}
              >
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} ALGO Journey. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6 text-gray-400">
            <Mail className="h-4 w-4 mr-1" />
            <span>contact@algojourney.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
