export const Blockquote = (props: React.PropsWithChildren) => {
  return (
    <blockquote className='[&>*]:!text-base-600 [&>*]:dark:!text-base-400'>
      {props.children}
    </blockquote>
  )
}
