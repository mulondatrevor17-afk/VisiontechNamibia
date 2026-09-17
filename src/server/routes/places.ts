import { Router } from 'express'

const router = Router()

router.get('/search', async (req, res) => {
  const { q } = req.query
  res.json({ results: [], query: q })
})

export default router
