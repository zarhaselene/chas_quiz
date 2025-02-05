import React from "react";
import { Brain, Trophy, User, Search, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                QuizMaster
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 font-medium"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 font-medium"
              >
                Practice
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 font-medium flex items-center gap-1"
              >
                <Trophy className="w-4 h-4" />
                Leaderboard
              </a>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-purple-600 rounded-full hover:bg-purple-50">
                <Search className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-purple-600 rounded-full hover:bg-purple-50 flex items-center gap-2">
                <User className="w-5 h-5" />
                Sign In
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-medium">
                Start Quiz
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 font-medium px-2 py-1"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 font-medium px-2 py-1"
                >
                  Categories
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 font-medium px-2 py-1"
                >
                  Practice
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-purple-600 font-medium px-2 py-1 flex items-center gap-1"
                >
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </a>
                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                  <button className="px-4 py-2 text-gray-600 hover:text-purple-600 rounded-full hover:bg-purple-50 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Sign In
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-medium">
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
