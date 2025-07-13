const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.105:3000" // Replace with your backend URL

export interface ShortenResponse {
  id: string
  url: string
  shortCode: string
  createdAt: string
  updatedAt: string
}

export interface StatsResponse extends ShortenResponse {
  accessCount: number
}

export interface LinkHistory {
  _id: string
  shortLink: string
  originalLink: string
  qrCode: string
  clicks: number
  status: "active" | "inactive" | "expired"
  createdAt: Date
  updatedAt: Date
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Create a new short URL
  async createShortUrl(url: string): Promise<ShortenResponse> {
    return this.request<ShortenResponse>("/shorten", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
  }

  // Get original URL from short code
  async getOriginalUrl(shortCode: string): Promise<ShortenResponse> {
    return this.request<ShortenResponse>(`/shorten/${shortCode}`)
  }

  // Update existing short URL
  async updateShortUrl(shortCode: string, url: string): Promise<ShortenResponse> {
    return this.request<ShortenResponse>(`/shorten/${shortCode}`, {
      method: "PUT",
      body: JSON.stringify({ url }),
    })
  }

  // Delete short URL
  async deleteShortUrl(shortCode: string): Promise<void> {
    await this.request(`/shorten/${shortCode}`, {
      method: "DELETE",
    })
  }

  // Get URL statistics
  async getUrlStats(shortCode: string): Promise<StatsResponse> {
    return this.request<StatsResponse>(`/shorten/${shortCode}/stats`)
  }

  // Get all user's short URLs (you might need to implement this endpoint)
  async getAllShortUrls(): Promise<LinkHistory[]> {
    return this.request<LinkHistory[]>("/shorten")
  }
}

export const apiService = new ApiService()
