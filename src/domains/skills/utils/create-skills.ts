import { randomId } from '@/utils/random-id'

import { type Skill } from '../type'

import { type IconType } from 'react-icons/lib'

type CreateSkillsPayload = {
  titles: string[]
  Icons: IconType[]
}

export const createSkills = (payload: CreateSkillsPayload) => {
  const { Icons, titles } = payload

  return titles.map<Skill>((title, index) => ({ id: randomId(), Icon: Icons[index], title }))
}
