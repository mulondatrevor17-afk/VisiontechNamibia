# VisiontechNamibia
Business website for VisionTech Namibia, a Windhoek-based web design studio — built and deployed live for real clients.
VisionTech Namibia — Business Website
Live site: visiontechna.online

Project Purpose
VisionTech Namibia is the public-facing website for my own web design studio, built and deployed as a real, live business site rather than a classroom exercise. It showcases the studio's services and design work to prospective clients in Windhoek and across Namibia.

Problem Being Addressed
Many small Namibian businesses lack access to affordable, fast, professional web design. This project is both a solution to that gap (a studio offering that service) and a demonstration of the quality of work the studio delivers — the site itself had to look and perform at a professional standard to credibly sell web design services.

An earlier version of the site relied on a generic AI-template look and messaging. This version replaces that with a bespoke visual identity and copy that resonates with the local market.

Technologies Used
HTML5, CSS3, JavaScript (vanilla, single-page site)
Framer Motion (custom animations)
Hand-built SVG illustration (hero section)
Netlify (hosting, SSL, deployment)
Namecheap (domain/DNS management)
Main Features
Custom "Kalahari sunset" visual palette and branding, replacing generic AI-template styling
Bespoke animated hero section with a custom SVG illustration
Mobile-first, fast-loading, single-page layout
Services, Testimonials, and Projects sections
Production SSL/DNS setup and live deployment on Netlify
How to Run
This is a static single-page site — no build step required:

Clone the repository
Open index.html directly in a browser, or serve the folder with any static file server (e.g. npx serve .)
The live production version is deployed automatically via Netlify
What I Learned
End-to-end deployment: configuring DNS and SSL for a custom domain rather than just writing front-end code
How to move a site's visual identity away from generic AI-generated templates toward a distinct, locally resonant brand
Practical animation work with Framer Motion, and building custom SVG graphics by hand
Troubleshooting real production issues (SSL/DNS) for a site actively used by clients, not just a local demo

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
