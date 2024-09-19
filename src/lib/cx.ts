import type { ElementType } from 'react'
import { createTwc, type TwcComponentProps } from 'react-twc'
import type { ClassNameValue } from 'tailwind-merge'
import { twMerge } from 'tailwind-merge'

export const cx = (...args: ClassNameValue[]) => twMerge(...args)
export const tw = createTwc({ compose: cx })

export type TWComponentProps<T extends ElementType> = Omit<TwcComponentProps<T>, 'className'> & {
  className?: string
}
