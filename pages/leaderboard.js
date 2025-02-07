import React from "react";
import {Trophy, Medal, Calendar, ChevronDown} from "lucide-react";
import {useContext} from "react";
import QuizContext from "./context/QuizContext";

const getRankDisplay = (index) => {
  switch (index) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />;
    default:
      return (
        <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-500">
          {index}
        </span>
      );
  }
};

export default function Leaderboard() {
  const {leaderboards} = useContext(QuizContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
          Leaderboards
        </h1>
        <div className="space-y-6">
          {Object.entries(leaderboards).map(([category, entries]) => (
            <div
              key={category}
              className="bg-b rounded-xl shadow-md overflow-hidden"
            >
              <div className="border-b bg-gray-50 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent">
                <h2 className="text-xl font-semibold text-white">{category}</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {entries.map((entry, index) => (
                  <li
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-8">{getRankDisplay(index + 1)}</div>
                        <div>
                          <p className="text-gray-900 font-semibold">
                            {entry.name}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{entry.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-purple-600">
                        {entry.score}p
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
