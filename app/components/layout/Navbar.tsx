"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LinkIcon, Copy, Check } from "lucide-react"
import { useUrlShortener } from "@/hooks/useUrlShortener"

export default function Navbar() {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const { shortenUrl, isLoading, error, shortenedUrl, clearResult } = useUrlShortener()

  useEffect(() => {
    if (shortenedUrl) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [shortenedUrl])  

  useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => setShowError(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [error])

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

              {/* Success Message */}
              {shortenedUrl && showSuccess && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[28rem] max-w-full p-3 bg-green-500/10 border border-green-500/20 rounded-lg z-20">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-green-400 text-xs font-medium">Success!</p>
                      <p className="text-white text-xs mt-1 break-all">
                        {`${typeof window !== "undefined" ? window.location.origin : ""}/${shortenedUrl.shortCode}`}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${typeof window !== "undefined" ? window.location.origin : ""}/${shortenedUrl.shortCode}`)}
                      className="ml-2 p-1 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Copy"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && showError && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[28rem] max-w-full p-3 bg-red-500/10 border border-red-500/20 rounded-lg z-20">
                  <p className="text-red-400 text-xs text-center">{error}</p>
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


