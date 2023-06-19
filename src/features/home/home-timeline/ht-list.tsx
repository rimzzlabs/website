import { createTimelines } from '@/utils/timeline'
import { tw } from '@/utils/tw'

import { HomeTimlineListItem } from './ht-list-item'

type TimeLineItemList = {
  id: string
  description: string
}

export type Timeline = {
  id: string
  title: string
  date: string
  cloudinaryImagePath: string
  list: TimeLineItemList[]
  currentEvent?: boolean
}

const timelines = createTimelines({
  titles: [
    'Vocational high school',
    'Going to campus',
    'Devcode challenge competition',
    'Accepted as an intern frontend developer',
    'Leveled up! , Accepted as a full-time engineer',
    'My first scooter bike',
    "Let's see what the future hold for",
  ],
  cloudinaryImagePaths: [
    'event-senior-high-school.svg',
    'event-campus.svg',
    'event-campus.svg',
    'event-campus.svg',
    'event-campus.svg',
    'event-campus.svg',
    'event-campus.svg',
  ],
  dates: [
    'May 2018',
    'November 2021',
    'December 2021',
    'January 2022',
    'April 2022',
    'May 2022',
    'Today',
  ],
  lists: [
    [
      'I studied Software Engineering.',
      'SMK Negeri 8 Pandeglang was my choice at that time.',
      'It was a very fun experience to start at the age of 16.',
    ],
    [
      'In advance of my studies in Software Engineering, I took off for another level of education.',
      'I chose D3 Informatics Management in AMIK Serang.',
      'There are a lot of good people I can connect with.',
      'Lots of practice in my daily college life, and I love it.',
    ],
    [
      'Skyshi Digital Indonesia hosted a coding challenge to create a web application using the SPA framework.',
      'Very fun and competitive coding challenges',
      'Learned a lot about React here',
    ],
    [
      'I applied for an internship at Skyshi Digital Indonesia.',
      'They accepted me for a three-month internship.',
      "An awesome three-month experience, never forget for what I've learned,",
    ],
    [
      'After doing a good job for the last three months, they hired me for a one-year contract as a frontend developer.',
      "While maintaining my campus activities, I'm doing the best I can to contribute to my job.",
      "Never forget of what I've achieved for the last year.",
      'They hired me for another one-year contract.',
    ],
    [
      'I bought a scooter for daily use.',
      'I caught an interest in motorcycles.',
      'Why scooter? scooter bike is the most common bike in Indonesia; it is simple to use, and it is affordable.',
    ],
    [
      'Working at Skyshi Digital Indonesia as a frontend developer.',
      'Continue improving my skills in software engineering and the related fields.',
      'While maintaining my hobbies about motorcycle.',
    ],
  ],
})

export const HomeTimelineList = () => {
  return (
    <ul className={tw('flex flex-col', 'mt-6')}>
      {timelines.map((timeline) => (
        <HomeTimlineListItem key={timeline.id} {...timeline} />
      ))}
    </ul>
  )
}
