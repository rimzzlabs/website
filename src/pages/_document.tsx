import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content='#171717' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icon-192.png' />
          <link rel='shortcut icon' href='/favicon.svg' type='svg/x-icon' />
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
