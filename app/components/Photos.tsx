import { siteConfig } from '@data'

import { PhotosItems } from './PhotosItems'

export function Photos() {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {siteConfig.booksIems.map((books, index) => (
          <PhotosItems
            key={books.src}
            src={books.src}
            name={books.name}
            idx={index}
          />
        ))}
      </div>
    </div>
  )
}
