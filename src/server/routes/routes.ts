import { Router } from 'express'

const router = Router()

router.post('/calculate', async (req, res) => {
  const { origin, destination } = req.body
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination are required' })
  }

  res.json({
    distance: '0km',
    duration: '0min',
    origin,
    destination,
  })
})

export default router
