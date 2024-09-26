'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import Image from './Image'

interface Props {
  src: string
  name: string
  idx: number
}

export function PhotosItems({ src, name, idx }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const possibleRotations = [1.3, -1.3, 1.3, -1.3, 1.3, -1.3]

  return (
    <motion.div
      key={src}
      initial={{ scale: 1, rotate: possibleRotations[idx % possibleRotations.length], opacity: 0 }}
      whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
      whileInView={{ opacity: 1, transition: { delay: idx / 100 } }}
      viewport={{ once: true }}
      onHoverStart={() => setIsVisible(true)}
      onHoverEnd={() => setIsVisible(false)}
      className={clsx(
        'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-lg border border-zinc-100 dark:border-zinc-900',
      )}
    >
      <Image
        src={src}
        alt={name}
        sizes="(min-width: 640px) 18rem, 11rem"
        className="absolute inset-0 size-full object-cover"
        fill
        priority
      />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full bg-gradient-to-t from-black/75 via-black/0 flex items-end"
          >
            <h3 className="px-3 py-2 text-xs font-bold text-white">{name}</h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
