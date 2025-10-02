import React from "react";
import { Link } from "react-router-dom";
import { Code, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-[#d5fbf2] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-[#00b8a3] rounded flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-[#00b8a3]">ALGO Journey</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Your companion for mastering Data Structures and Algorithms.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00b8a3]">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00b8a3]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00b8a3]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/problem" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Practice Problems
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Blog Articles
                </Link>
              </li>
              <li>
                <Link to="/interview" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link to="/contest" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Contests
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-[#00b8a3] hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {currentYear} ALGO Journey. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <a href="mailto:contact@algojourney.com" className="text-sm text-gray-600 hover:text-[#00b8a3] flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>contact@algojourney.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;