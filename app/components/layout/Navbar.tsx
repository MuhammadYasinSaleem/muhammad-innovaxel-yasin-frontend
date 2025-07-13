"use client"

import type React from "react"

import Link from "next/link"
import { LinkIcon, Copy, Check } from "lucide-react"
import { useState } from "react"
import { useUrlShortener } from "@/hooks/useUrlShortener"

export default function Navbar() {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const { shortenUrl, isLoading, error, shortenedUrl, clearResult } = useUrlShortener()

  const handleShortenUrl = async () => {
    if (!url.trim()) return

    await shortenUrl(url)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleShortenUrl()
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    if (shortenedUrl) {
      clearResult()
    }
  }

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
                  value={url}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Paste your long URL here..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base font-medium tracking-wide"
                  disabled={isLoading}
                />
                <button
                  onClick={handleShortenUrl}
                  disabled={isLoading || !url.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-7 py-[0.5rem] rounded-full text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Shortening..." : "Shorten"}
                  <span className="hidden sm:inline"> {isLoading ? "" : "Now"}</span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {shortenedUrl && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm font-medium">URL shortened successfully!</p>
                      <p className="text-white text-sm mt-1">
                        Short URL:
                        <span className="ml-2 text-blue-400 font-mono">
                          {`${window.location.origin}/${shortenedUrl.shortCode}`}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/${shortenedUrl.shortCode}`)}
                      className="ml-2 p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
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
        <div className="bg-[#0b101b]"></div>
      </div>
    </nav>
  )
}
