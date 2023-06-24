import { type IconType } from 'react-icons'

export type Skill = {
  id: string
  title: string
  Icon: IconType
}

export type Skills = {
  readonly 'React Ecosystem': Skill[]
  readonly Languages: Skill[]
  readonly Libraries: Skill[]
  readonly Frameworks: Skill[]
  readonly 'I am Learning': Skill[]
}
