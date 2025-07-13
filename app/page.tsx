"use client";
import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import { Clock, ChartColumnBig, Funnel } from "lucide-react";
import HistoryTable from "./components/ui/HistoryTable";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"history" | "statistics">(
    "history"
  );

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Navbar />
      <div className="flex flex-col items-center min-h-[calc(100vh-5.5rem)] px-4">
        <div className="w-screen h-15 bg-[#181e29] flex items-center justify-center gap-7">
          {/* History Tab */}
          <button
            onClick={() => setActiveTab("history")}
            className={`flex flex-col items-center focus:outline-none group cursor-pointer`}
          >
            <div
              className={`flex items-center px-3 py-1 transition-all ${
                activeTab === "history" ? "text-blue-400" : "text-white"
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
              className={`flex items-center px-3 py-1 transition-all ${
                activeTab === "statistics" ? "text-blue-400" : "text-white"
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
