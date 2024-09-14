import Link from 'next/link'

interface CustomLinkProps {
  href: string
  [x: string]: any
}

function CustomLink({ href, ...rest }: CustomLinkProps) {
  const isInternalLink = href?.startsWith('/')
  const isAnchorLink = href?.startsWith('#')

  if (isInternalLink) {
    return <Link href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
