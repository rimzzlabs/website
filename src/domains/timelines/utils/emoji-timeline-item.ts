import { type Timeline } from '../type'

import { match } from 'ts-pattern'

const createEmojiTimeline = (type: Timeline['emoji']) => {
  return match(type)
    .with('CAREER', () => '💻')
    .with('LIFE', () => '🧬')
    .with('SCHOOL', () => '🏫')
    .with('OTHER', () => '🚀')
    .with('CURRENT_EVENT', () => '🧭')
    .exhaustive()
}

export default createEmojiTimeline
