export const ANIMATION_INITIAL = { opacity: 0 }

export const ANIMATION_FINAL = {
  opacity: 1,
  transition: {
    delay: 0.1,
    duration: 0.25,
    ease: 'easeOut',
  },
} as const
