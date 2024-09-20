import { ArrowIcon } from './icons'
import Image from './Image'
import Link from './Link'

interface Props {
  channelName: string
  channelUrl: string
  imgSrc: string
}

export function ChannelLink({ channelName, channelUrl, imgSrc }: Props) {
  return (
    <div className="group flex w-full">
      <Link
        href={channelUrl}
        title={channelName}
        className="flex w-full items-center justify-between bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5"
      >
        <div className="flex items-center space-x-4">
          <div className="relative h-16">
            <Image
              alt={channelName}
              src={imgSrc}
              height={64}
              width={64}
              sizes="33vw"
              className="size-16 rounded-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <p className="text-base text-slate-900 font-semibold dark:text-slate-300">{channelName}</p>
            <p>Youtube Channel</p>
          </div>
        </div>
        <div className="transform text-slate-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-slate-300">
          <ArrowIcon />
        </div>
      </Link>
    </div>
  )
}
