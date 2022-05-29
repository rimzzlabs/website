const Blockquote = (props: { children: React.ReactNode }) => {
  return (
    <blockquote>
      {props.children}
      <style jsx>
        {`
          blockquote {
            border-image: linear-gradient(to bottom, #3b82f6, #14b8a6) 1;
          }
        `}
      </style>
    </blockquote>
  )
}

export default Blockquote
