import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content='#18181b' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icon-192.png' />
          <link rel='shortcut icon' href='/favicon.svg' type='svg/x-icon' />
          <link rel='manifest' href='/manifest.json' />
          {process.env.NODE_ENV === 'production' && (
            <script
              async
              defer
              data-do-not-track='true'
              data-website-id='6daf05f5-92d2-430f-9cdd-1801014260da'
              src='https://umami.rizkicitra.dev/umami.js'
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
