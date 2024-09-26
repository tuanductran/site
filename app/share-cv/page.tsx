import CVForm from '@components/cvForm'
import { PageLayout } from '@components/PageContainer'

const seoTitle = 'Share Your CV'
const seoDescription = 'Easily and quickly share your CV to stand out to potential employers.'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default function ShareCV() {
  return (
    <PageLayout title={seoTitle} intro={seoDescription}>
      <CVForm />
    </PageLayout>
  )
}
