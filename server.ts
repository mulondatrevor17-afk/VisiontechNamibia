import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { env } from './src/server/config/env.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(env.PORT)

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'visiontech-namibia-api' })
})

app.use('/api/gemini', (await import('./src/server/routes/gemini.js')).default)
app.use('/api/places', (await import('./src/server/routes/places.js')).default)
app.use('/api/routes', (await import('./src/server/routes/routes.js')).default)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', async (req, res) => {
    try {
      // Read the client index.html and inject server-rendered app HTML
      const indexPath = path.join(__dirname, 'dist', 'index.html');
      let html = await import('fs').then(fs => fs.promises.readFile(indexPath, 'utf-8'));

      // Import the SSR renderer (compiled by tsc) and render the app
      const { render } = await import('./src/server/ssr.ts');
      const appHtml = render(req.originalUrl || req.url);

      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (err) {
      console.error('SSR error:', err);
      res.status(500).send('Server Error');
    }
  })
}

app.listen(PORT, () => {
  console.log(`🚀 VisionTech API running at http://localhost:${PORT}`)
})
