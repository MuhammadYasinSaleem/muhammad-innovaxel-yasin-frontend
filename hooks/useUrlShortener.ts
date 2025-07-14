// hooks/useUrlShortener.ts
import { useState } from 'react';
import { apiService } from '@/lib/api';

export const useUrlShortener = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortenedUrl, setShortenedUrl] = useState<{
    _id: string;
    shortCode: string;
    originalUrl: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  const shortenUrl = async (originalUrl: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.shortenUrl(originalUrl);
      setShortenedUrl(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResult = () => {
    setShortenedUrl(null);
    setError(null);
  };

  return {
    shortenUrl,
    isLoading,
    error,
    shortenedUrl,
    clearResult,
  };
};