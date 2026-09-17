<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# VisionTech Namibia

Digital agency portfolio and AI-enabled storefront built with React 19, TypeScript, Tailwind CSS, Vite, and Express.

## Preview

- Local frontend preview: http://localhost:5173 after running `npm run dev`
- Local API server: http://localhost:3001 after running `npm run server`

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and fill in any required values.
3. Run frontend only:
   `npm run dev`
4. Run backend only:
   `npm run server`
5. Run both together:
   `npm run dev:full`

## Environment Variables

Copy `.env.example` to `.env.local` and update values as needed.

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | API server port, defaults to `3001`. |
| `NODE_ENV` | No | Environment mode, defaults to `development`. |
| `GEMINI_API_KEY` | No | Google GenAI API key for live chat responses. |
| `VITE_API_URL` | No | Frontend API URL, defaults to `http://localhost:3001`. |
| `VITE_GOOGLE_MAPS_API_KEY` | No | Google Maps key for map-related features. |
| `VITE_FIREBASE_API_KEY` | No | Firebase API key if using Firebase services. |
| `VITE_FIREBASE_AUTH_DOMAIN` | No | Firebase auth domain. |
| `VITE_FIREBASE_PROJECT_ID` | No | Firebase project ID. |
