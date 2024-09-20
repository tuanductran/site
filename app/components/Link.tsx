import Link from 'next/link'

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: any
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, ...rest }) => {
  const isInternalLink = href.startsWith('/')
  const isAnchorLink = href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  )
}

export default CustomLink
