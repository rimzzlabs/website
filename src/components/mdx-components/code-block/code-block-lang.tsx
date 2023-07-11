import { SiGnubash, SiJavascript, SiJson, SiReact, SiTypescript } from 'react-icons/si'
import { P, match } from 'ts-pattern'

type CodeBlockLabelProps = {
  label: string
}
export const CodeBlockLanguage = (props: CodeBlockLabelProps) => {
  const IconProps = {
    size: 18,
    className: 'text-base-800 dark:text-base-200',
  }

  return match([props.label, IconProps])
    .with(['js', P._], ([label, props]) => <SiJavascript {...props} title={label} />)
    .with(['bash', P._], ([label, props]) => <SiGnubash {...props} title={label} />)
    .with(['json', P._], ([label, props]) => <SiJson {...props} title={label} />)
    .with(['ts', P._], ([label, props]) => <SiTypescript {...props} title={label} />)
    .with(['tsx', P._], ([label, props]) => <SiReact {...props} title={label} />)
    .otherwise(([label]) => {
      return <span className='text-base-800 dark:text-yellow-400 text-sm font-medium'>{label}</span>
    })
}
