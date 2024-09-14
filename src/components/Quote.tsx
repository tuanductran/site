interface Props {
  quote: string
}

export function Quote({ quote }: Props) {
  return <blockquote>{quote}</blockquote>
}
