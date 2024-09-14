import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const font = fetch(new URL('./Inter-SemiBold.otf', import.meta.url)).then(res =>
  res.arrayBuffer(),
)

export default async function (req: NextRequest) {
  const inter = await font

  const { searchParams } = new URL(req.url)

  const hasTitle = searchParams.has('title')
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'Tuan Duc Tran'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 80,
          backgroundColor: '#030303',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          backgroundPosition: '-30px -10px',
          fontWeight: 600,
          color: 'white',
        }}
      >
        <svg
          style={{ position: 'absolute', top: 70, left: 80 }}
          height="40"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.392 4.978L21.71 4.193l-3.38-1.926c-.835-.568-1.846-.838-2.844-.768L3.397 1.983 6.392 4.978zM5 6.414l-3-3v13.48c0 .596.174 1.171.504 1.664L5 22.303V6.414zM7 6.95v15.989l15.062-.941C22.589 21.965 23 21.528 23 21V6.13L7 6.95zM20.458 9.84c-.531.11-.531.11-.531.645 0 2.874-.002 5.748.005 8.622 0 .2-.054.322-.244.382-.341.108-.675.248-1.023.321-.557.116-1.047-.037-1.381-.515-.461-.659-.91-1.326-1.348-2-1.018-1.567-2.027-3.141-3.039-4.712-.022-.034-.047-.065-.105-.142-.012.107-.025.171-.025.235-.001 1.956.001 3.913-.005 5.869-.001.173.055.243.222.275.375.072.747.162 1.117.244-.045.406-.27.658-.686.727-.305.05-.617.057-.927.075-.75.045-1.502.079-2.251.132-.218.016-.262-.075-.225-.253.046-.222.159-.383.399-.441.236-.057.469-.131.703-.197 0-2.814 0-5.613 0-8.432-.356-.031-.704-.062-1.049-.092-.137-.484.165-.931.676-.972.92-.074 1.845-.103 2.762-.204.392-.044.576.1.772.4 1.298 1.987 2.613 3.963 3.923 5.942.048.073.101.144.195.279 0-2.001 0-3.928 0-5.87-.32-.037-.626-.081-.934-.104-.168-.012-.209-.088-.19-.236.041-.317.29-.605.624-.63C18.909 9.112 19.928 9.06 20.941 9 21.088 9.5 20.946 9.739 20.458 9.84z" fill="white" />
        </svg>
        <p
          style={{
            position: 'absolute',
            bottom: 70,
            left: 80,
            margin: 0,
            fontSize: 30,
            letterSpacing: -1,
          }}
        >
          A product created from Next.js and Notion.
        </p>
        <h1
          style={{
            fontSize: 82,
            margin: '0 0 40px -2px',
            lineHeight: 1.1,
            textShadow: '0 2px 30px #000',
            letterSpacing: -4,
            backgroundImage: 'linear-gradient(90deg, #fff 40%, #aaa)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'inter',
          data: inter,
          style: 'normal',
        },
      ],
    },
  )
}
