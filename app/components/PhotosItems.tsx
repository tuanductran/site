import clsx from 'clsx'

import Image from './Image'

interface Props {
  idx: number
  name: string
  src: string
}

export function PhotosItems({ idx, name, src }: Props) {
  const possibleRotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div
      key={src}
      className={clsx(
        'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-lg border border-zinc-100 dark:border-zinc-900',
        possibleRotations[idx % possibleRotations.length],
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
    </div>
  )
}
