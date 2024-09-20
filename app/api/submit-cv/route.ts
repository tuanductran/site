import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

interface FormData {
  fullName: string
  email: string
  cvLink: string
  socialLink: string
  position: string
}

export async function POST(req: Request) {
  const notion = new Client({ auth: process.env.CV_NOTION_TOKEN })

  const { fullName, email, cvLink, socialLink, position }: FormData = await req.json()

  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.CV_NOTION_DATABASE_ID!,
      },
      properties: {
        'Full Name': {
          title: [
            { text: { content: fullName } },
          ],
        },
        'Email': {
          email,
        },
        'CV Link': {
          url: cvLink,
        },
        'Social Link': {
          url: socialLink,
        },
        'Position': {
          rich_text: [
            { text: { content: position } },
          ],
        },
      },
    })

    return NextResponse.json({ message: 'CV submitted successfully!' }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json({ message: 'Error submitting CV', error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
