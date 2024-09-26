import { siteConfig } from '@data'

import { PhotosItems } from './PhotosItems'

export function Photos() {
  return (
    <div className="my-8">
      <div className="hide-scrollbar -my-4 flex gap-8 overflow-y-auto py-4 px-8">
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
