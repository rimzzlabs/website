'use client'

import { type Skills, skills } from '@/domains/skills'

import { tw } from '@/utils/tw'

import { HomeSkillItem } from './hs-item'

import { Tab } from '@headlessui/react'

export const HomeSkillsTab = () => {
  const tabList = Object.keys(skills) as Array<keyof Skills>
  const tabPanels = Object.values(skills)

  return (
    <Tab.Group defaultIndex={0}>
      <Tab.List className='flex overflow-x-auto snap-x snap-mandatory md:snap-none'>
        {tabList.map((tab) => {
          return (
            <Tab
              key={tab}
              className={({ selected }) =>
                tw(
                  'snap-start',
                  'flex items-center justify-center',
                  'h-10 w-full max-w-max',
                  'px-3.5 flex-shrink-0 transition',
                  'border-b-4 border-b-transparent',
                  'hover:bg-base-200 dark:hover:bg-base-800',
                  'focus-visible:ring-0 focus-visible:ring-offset-0',
                  'focus-visible:bg-base-200 dark:focus-visible:bg-base-800',
                  'focus-visible:border-b-base-300 dark:focus-visible:border-b-base-700',
                  selected && 'border-b-primary-600 dark:border-b-primary-600',
                  selected && 'hover:border-b-base-300 dark:hover:border-b-base-700',
                )
              }
            >
              {tab}
            </Tab>
          )
        })}
      </Tab.List>

      <Tab.Panels className='mt-4'>
        {tabPanels.map((skillItems, index) => {
          return (
            <Tab.Panel key={`tab-panel-${index}`}>
              <ul className={tw('grid', 'gap-3', 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4')}>
                {skillItems.map((skill) => {
                  return <HomeSkillItem key={skill.id} {...skill} />
                })}
              </ul>
            </Tab.Panel>
          )
        })}
      </Tab.Panels>
    </Tab.Group>
  )
}
