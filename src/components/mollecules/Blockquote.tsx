const Blockquote: React.FC = (props) => {
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
