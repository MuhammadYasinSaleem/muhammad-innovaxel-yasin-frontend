"use client"

import { useState } from "react"
import { apiService, type ShortenResponse } from "@/lib/api"

export const useUrlShortener = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shortenedUrl, setShortenedUrl] = useState<ShortenResponse | null>(null)

  const shortenUrl = async (url: string) => {
    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await apiService.createShortUrl(url)
      setShortenedUrl(result)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to shorten URL")
    } finally {
      setIsLoading(false)
    }
  }

  const clearResult = () => {
    setShortenedUrl(null)
    setError(null)
  }

  return {
    shortenUrl,
    isLoading,
    error,
    shortenedUrl,
    clearResult,
  }
}
