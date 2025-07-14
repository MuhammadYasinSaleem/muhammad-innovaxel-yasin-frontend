"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Navbar from "./components/layout/Navbar"
import { ArrowRight, Copy, Check, LinkIcon } from "lucide-react"
import HistoryTable from "./components/ui/HistoryTable"
import { useUrlShortener } from "@/hooks/useUrlShortener"

export default function Home() {
  const [mobileUrl, setMobileUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const { shortenUrl, isLoading, error, shortenedUrl, clearResult } = useUrlShortener()

  const handleMobileShortenUrl = async () => {
    if (!mobileUrl.trim()) return
    await shortenUrl(mobileUrl)
  }

  const handleMobileKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleMobileShortenUrl()
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

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileUrl(e.target.value)
    if (shortenedUrl) {
      clearResult()
    }
  }

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

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Navbar />
      <div className="flex flex-col items-center min-h-[calc(100vh-5.5rem)] px-4">
        <div className="md:hidden flex items-center flex-col max-w-[20rem] gap-3">
          <h1 className="mt-7 max-w-[17rem] text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-3xl font-extrabold tracking-wide font-bricolage">
            Shorten Your Loooong Links :)
          </h1>
          <p className="text-sm text-center">
            Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
          </p>

          {/* Mobile URL input box */}
          <div className="md:hidden flex-1 max-w-xl mx-8 mb-3">
            <div className="relative">
              <div className="flex items-center bg-[#181E29]/70 backdrop-blur-md rounded-full px-4 py-[0.5rem] border border-gray-700/50 shadow-lg ring-3 ring-gray-600">
                <div className="p-1.5 mr-3">
                  <LinkIcon className="w-4 h-4 text-white opacity-80" />
                </div>
                <input
                  type="text"
                  value={mobileUrl}
                  onChange={handleMobileInputChange}
                  onKeyPress={handleMobileKeyPress}
                  placeholder="Enter the link here..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm font-medium tracking-wide mr-7"
                  disabled={isLoading}
                />
                <button
                  onClick={handleMobileShortenUrl}
                  disabled={isLoading || !mobileUrl.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-2 py-[0.5rem] rounded-full text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? "..." : <ArrowRight />}
                </button>
              </div>

              {/* Mobile Error Message */}
              {error && showError && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-xs">{error}</p>
                </div>
              )}

              {/* Mobile Success Message */}
              {shortenedUrl && showSuccess && (
                <div className="mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-green-400 text-xs font-medium">Success!</p>
                      <p className="text-white text-xs mt-1 break-all">
                        {`${window.location.origin}/${shortenedUrl.shortCode}`}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/${shortenedUrl.shortCode}`)}
                      className="ml-2 p-1 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Copy"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Show HistoryTable by default */}
        <div className="w-full max-w-6xl mt-8">
          <HistoryTable />
        </div>
      </div>
    </div>
  )
}
