import readingTime from 'reading-time'

type TBaseProps = {
  _raw: {
    sourceFileName: string
  }
  body: {
    raw: string
    code: string
  }
}

export const getReadingTime = <TProps extends TBaseProps>(props: TProps) => {
  const read = readingTime(props.body.raw, { wordsPerMinute: 255 })

  return {
    words: read.words,
    minutes: read.minutes,
  }
}

export const getSlug = <TProps extends TBaseProps>(props: TProps) => {
  return props._raw.sourceFileName.replace(/\.mdx$/, '')
}
