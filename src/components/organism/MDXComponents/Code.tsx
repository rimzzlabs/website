import clsx from 'clsx'

const Code: React.FC = (props) => {
  return (
    <code
      className={clsx(
        'p-1 font-normal rounded border',
        'bg-transparent text-primary-600 border-theme-300',
        'dark:border-theme-700 dark:text-primary-400'
      )}
    >
      <span>{props.children}</span>
    </code>
  )
}

export default Code
