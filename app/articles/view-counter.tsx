export default function ViewCounter({
  slug,
  allViews,
}: {
  slug: string
  allViews: {
    slug: string
    count: number
  }[]
  trackView?: boolean
}) {
  const viewsForSlug = allViews && allViews.find(view => view.slug === slug)
  const number = Number(viewsForSlug?.count || 0)

  return (
    <p className="text-sm leading-6 dark:text-slate-400">
      {`${number.toLocaleString()} views`}
    </p>
  )
}
