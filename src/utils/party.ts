import confetti from 'canvas-confetti'
import { cache } from 'react'

export const sparkConfeti = cache((origin: { x: number; y: number }) => {
  confetti({
    particleCount: 100,
    startVelocity: 25,
    spread: 100,
    origin,
  })
})
