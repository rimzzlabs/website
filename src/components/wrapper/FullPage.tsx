import clsx from 'clsx'

type FullPageProps = {
  children: React.ReactNode
  className?: string
}

const FullPage = ({ children, className = '' }: FullPageProps) => {
  return (
    <div className={clsx('min-h-screen py-20 w-full', className)}>
      {children}
    </div>
  )
}

export default FullPage
