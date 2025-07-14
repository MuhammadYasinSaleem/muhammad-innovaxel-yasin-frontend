// lib/api.ts
interface ShortUrlResponse {
  _id: string;
  originalUrl: string;
  shortCode: string;
  accessCount: number;
  createdAt: string;
  updatedAt: string;
}

export type LinkHistory = {
  _id: string;
  shortLink: string;
  originalLink: string;
  clicks: number;
  updatedAt: string | Date;
  // ...other fields as needed
};

export const apiService = {
  async shortenUrl(originalUrl: string): Promise<ShortUrlResponse> {
    const response = await fetch('/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  async getAllShortUrls(): Promise<LinkHistory[]> {
    const response = await fetch('/shorten');
    if (!response.ok) {
      throw new Error('Failed to fetch URLs');
    }
    const data = await response.json();
    return data.map((url: any) => ({
      _id: url._id,
      shortLink: url.shortCode,
      originalLink: url.originalUrl,
      clicks: url.accessCount,
      updatedAt: new Date(url.updatedAt),
    }));
  },

  async getOriginalUrl(shortCode: string): Promise<{ url: string }> {
    const response = await fetch(`/shorten/${shortCode}`);
    if (!response.ok) {
      throw new Error('URL not found');
    }
    const data = await response.json();
    return { url: data.originalUrl };
  },

  async updateShortUrl(shortCode: string, newUrl: string): Promise<{ url: string; updatedAt: string }> {
    const response = await fetch(`/shorten/${shortCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl: newUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to update URL');
    }

    const data = await response.json();
    return { url: data.originalUrl, updatedAt: new Date().toISOString() };
  },

  async deleteShortUrl(shortCode: string): Promise<void> {
    const response = await fetch(`/shorten/${shortCode}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete URL');
    }
  },

  async getUrlStats(shortCode: string): Promise<ShortUrlResponse> {
    const response = await fetch(`/shorten/${shortCode}/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return response.json();
  },
};