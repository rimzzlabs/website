import { P, match } from 'ts-pattern'

type P = {
  tag?: string
}

export const TagHero = (props: P) => {
  const tag = match(props.tag)
    .with(P.not(P.nullish), (tag) => <h1 className='title mb-2'>Tag: {tag}</h1>)
    .otherwise(() => <h1 className='title mb-2'>Tag</h1>)

  return (
    <section className='mb-8'>
      {tag}
      <p>You can filter my post based on the available tags I provide.</p>
    </section>
  )
}
