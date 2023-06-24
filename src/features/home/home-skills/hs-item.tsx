import { type Skill } from '@/domains/skills'

import { tw } from '@/utils/tw'

import { match } from 'ts-pattern'

export const HomeSkillItem = (props: Skill) => {
  return (
    <li
      className={tw(
        'flex flex-col items-center',
        'py-7 px-3',
        'border border-base-400 dark:border-base-800',
      )}
    >
      <h3 className='order-2 text-center text-sm md:text-base 3xl:text-base'>{props.title}</h3>
      <props.Icon className={tw('order-1 mb-3', getIconColor(props.title))} size={36} />
    </li>
  )
}

function getIconColor(title: string) {
  return match(title.toLowerCase())
    .with('react', () => 'text-cyan-500')
    .with('tanstack query', () => 'text-rose-700')
    .with('react hook form', () => 'text-pink-600')
    .with('scss', () => 'text-pink-600')
    .with('redux', () => 'text-violet-500')
    .with('html', () => 'text-orange-600')
    .with('css', () => 'text-blue-700')
    .with('bootstrap', () => 'text-purple-500')
    .with('tailwind css', () => 'text-sky-500')
    .with('headless ui', () => 'text-sky-500')
    .with('chart.js', () => 'text-rose-400')
    .with('vite', () => 'text-yellow-500')
    .with('javascript', () => 'text-yellow-400')
    .with('typescript', () => 'text-blue-500')
    .with('node.js', () => 'text-green-600')
    .with('vue.js', () => 'text-emerald-500')
    .with('create react app', () => 'text-emerald-400')
    .with('angular', () => 'text-red-500')
    .with('figma', () => 'text-rose-500')
    .with('jira', () => 'text-blue-500')
    .with('version control system', () => 'text-orange-500')
    .with('vs code', () => 'text-blue-500')
    .with('pnpm', () => 'text-yellow-500')
    .with('kotlin', () => 'text-purple-500')
    .with('android development', () => 'text-green-600')
    .otherwise(() => null)
}
