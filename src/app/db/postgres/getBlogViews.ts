'use server'

import {
  unstable_noStore as noStore,
} from 'next/cache'

import { sql } from './sql'

export async function getBlogViews() {
  if (!process.env.POSTGRES_URL) {
    return []
  }

  noStore()
  const views = await sql`
    SELECT count
    FROM views
  `

  return views.reduce((acc, curr) => acc + Number(curr.count), 0)
}
