import { Client } from '@notionhq/client'
import type { NextApiRequest, NextApiResponse } from 'next'

interface FormData {
  fullName: string
  email: string
  cvLink: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const notion = new Client({ auth: process.env.CV_NOTION_TOKEN })

    const { fullName, email, cvLink }: FormData = req.body

    try {
      await notion.pages.create({
        parent: {
          database_id: process.env.CV_NOTION_DATABASE_ID,
        },
        properties: {
          'Full Name': {
            title: [
              {
                text: {
                  content: fullName,
                },
              },
            ],
          },
          'Email': {
            email,
          },
          'CV Link': {
            url: cvLink,
          },
        },
      })

      return res.status(200).json({ message: 'CV submitted successfully!' })
    }
    catch (error) {
      return res.status(500).json({ message: 'Error submitting CV', error: error instanceof Error ? error.message : 'Unknown error' })
    }
  }
  else {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}
