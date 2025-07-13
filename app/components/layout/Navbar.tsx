import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* Logo with animation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-3xl font-extrabold tracking-wide font-bricolage">
                Linkly
              </span>
            </Link>
          </div>

          {/* URL Input Bar with glassmorphism effect */}
          <div className="hidden md:block flex-1 max-w-3xl mx-8">
            <div className="relative">
              <div className="flex items-center bg-[#181E29]/70 backdrop-blur-md rounded-full px-4 py-[0.5rem] border border-gray-700/50 shadow-lg ring-3 ring-gray-600">
                <div className="p-1.5 mr-3">
                  <LinkIcon className="w-5 h-5 text-white opacity-80" />
                </div>
                <input
                  type="text"
                  placeholder="Paste your long URL here..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base font-medium tracking-wide "
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-7 py-[0.5rem] rounded-full text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl">
                  Shorten
                  <span className="hidden sm:inline"> Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* User Profile with dropdown */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              <div className="group relative">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-gray-300 text-sm font-medium">Welcome back,</span>
                    <span className="text-white text-sm font-semibold">User</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu with modern design */}
      <div className="md:hidden" id="mobile-menu">
        <div className="bg-[#0b101b]">

        </div>

      </div>
    </nav >
  );
}