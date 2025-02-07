import React from "react";
import {Brain, Twitter, Facebook, Instagram, Mail, Heart} from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* Spacer div to push footer down */}
      <div className="flex-grow"></div>

      <footer className="mt-auto bg-gray-50 border-t border-gray-200 bottom-0 w-full">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {/* Brand Section - Full width on mobile */}
            <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                  QuizMaster
                </span>
              </div>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-sm">
              <h3 className="font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Quick Links
              </h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="/leaderboard"
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-sm">
              <h3 className="font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Support
              </h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact - Hidden on mobile */}
            <div className="text-sm hidden md:block">
              <h3 className="font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Contact
              </h3>
              <p className="text-gray-600">support@quizmaster.com</p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-4 md:mt-6 pt-4 border-t border-gray-200 text-sm">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="text-gray-600">© 2025 QuizMaster</div>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Privacy
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
