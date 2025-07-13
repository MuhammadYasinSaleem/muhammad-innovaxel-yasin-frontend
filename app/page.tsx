"use client";
import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import { Clock, ChartColumnBig, ArrowRight } from "lucide-react";
import HistoryTable from "./components/ui/HistoryTable";
import { Link as LinkIcon } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"history" | "statistics">(
    "history"
  );

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Navbar />
      <div className="flex flex-col items-center min-h-[calc(100vh-5.5rem)] px-4">

        <div className="md:hidden flex items-center flex-col max-w-[20rem] gap-3">
          <h1 className="mt-7 max-w-[17rem] text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-3xl font-extrabold tracking-wide font-bricolage">Shorten Your Loooong Links :)</h1>
          <p className="text-sm text-center">Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>

          {/* URL input box */}
          <div className="md:hidden flex-1 max-w-xl mx-8 mb-3">
            <div className="relative">
              <div className="flex items-center bg-[#181E29]/70 backdrop-blur-md rounded-full px-4 py-[0.5rem] border border-gray-700/50 shadow-lg ring-3 ring-gray-600">
                <div className="p-1.5 mr-3">
                  <LinkIcon className="w-4 h-4 text-white opacity-80" />
                </div>
                <input
                  type="text"
                  placeholder="Enter the link here..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm font-medium tracking-wide mr-7"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-2 py-[0.5rem] rounded-full text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>

        </div>




        <div className="w-screen h-15 bg-[#181e29] flex items-center justify-center gap-7">
          {/* History Tab */}
          <button
            onClick={() => setActiveTab("history")}
            className={`flex flex-col items-center focus:outline-none group cursor-pointer`}
          >
            <div
              className={`flex items-center px-3 py-1 transition-all ${activeTab === "history" ? "text-blue-400" : "text-white"
                }`}
            >
              <Clock className="inline-block mr-2" width={15} />
              <span className="text-lg">History</span>
            </div>
            {activeTab === "history" && (
              <div className="w-full h-1 rounded-t bg-blue-500 shadow-[0_-4px_16px_0_rgba(59,130,246,0.5)]" />
            )}
          </button>
          {/* Statistics Tab */}
          <button
            onClick={() => setActiveTab("statistics")}
            className={`flex flex-col items-center focus:outline-none group cursor-pointer`}
          >
            <div
              className={`flex items-center px-3 py-1 transition-all ${activeTab === "statistics" ? "text-blue-400" : "text-white"
                }`}
            >
              <ChartColumnBig className="inline-block mr-2" width={15} />
              <span className="text-lg">Statistics</span>
            </div>
            {activeTab === "statistics" && (
              <div className="w-full h-1 rounded-t bg-blue-500 shadow-[0_-4px_16px_0_rgba(59,130,246,0.5)]" />
            )}
          </button>
        </div>
        {/* Render HistoryTable when activeTab is "history" */}
        {activeTab === "history" && (
          <div className="w-full max-w-6xl mt-8">

            <HistoryTable />
          </div>
        )}
      </div>
    </div>
  );
}
