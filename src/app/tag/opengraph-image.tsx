import { ImageResponse } from 'next/server'

export const runtime = 'edge'
export const alt = 'About Acme'

export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#030712',
          color: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingInline: '4px',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
        }}
      >
        <p
          style={{
            fontSize: 128,
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Tags
        </p>
        <p
          style={{
            fontSize: 64,
          }}
        >
          Helps you filter out my posts based on your favorite tag
        </p>
      </div>
    ),
    {
      ...size,
    },
  )
}
