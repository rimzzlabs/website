import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content='#171717' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icon-192.png' />
          <link rel='shortcut icon' href='/favicon.svg' type='svg/x-icon' />
          <link rel='manifest' href='/manifest.json' />
          <script
            async
            defer
            data-do-not-track='true'
            data-website-id='6daf05f5-92d2-430f-9cdd-1801014260da'
            src='https://rizkicitra-analytics.vercel.app/umami.js'
          />
          <script
            async
            defer
            data-do-not-track='true'
            data-domains='rizkicitra-git-revision-rizkimcitra.vercel.app'
            data-website-id='6daf05f5-92d2-430f-9cdd-1801014260da'
            src='https://rizkicitra-analytics.vercel.app/umami.js'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
