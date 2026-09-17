export interface GeminiChatRequest {
  message: string
  history?: Array<{ role: string; text: string }>
  voiceMode?: boolean
}

export interface GeminiChatResponse {
  reply: string
  source: string
}

export interface Place {
  id: string
  name: string
  address: string
  category: string
  lat: number
  lng: number
  description: string
  phone: string
  rating: number
}

export interface PlacesResponse {
  places: Place[]
}

export interface CalculatedRoute {
  title: string
  origin: string
  destination: string
  distance: string
  duration: string
  steps: string[]
}

export interface RouteResponse {
  route: CalculatedRoute
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function fetchApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...init,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  geminiChat: (payload: GeminiChatRequest) =>
    fetchApi<GeminiChatResponse>('/api/gemini/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  searchPlaces: (query: string) =>
    fetchApi<PlacesResponse>(`/api/places/search?q=${encodeURIComponent(query)}`),

  calculateRoute: (origin: string, destination: string) =>
    fetchApi<RouteResponse>('/api/routes/calculate', {
      method: 'POST',
      body: JSON.stringify({ origin, destination }),
    }),
}
