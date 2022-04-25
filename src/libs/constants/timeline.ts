export interface Timeline {
  title: string
  description: string
  place: string
  start_date: Date
  end_date: Date | null
  type: 'edu' | 'work'
}

export const timeline: Array<Timeline> = [
  {
    title: 'High School',
    type: 'edu',
    place: 'Vocational High School 8 Pandeglang',
    start_date: new Date(2018, 5, 14),
    end_date: new Date(2021, 4, 28),
    description:
      'Entering High School, it was a pleasant time when I was in High School, learning all of those fundamentals such as logical gate, and I even play around with Java for 2 semesters'
  },
  {
    title: 'College',
    type: 'edu',
    place: 'AMIK Serang',
    start_date: new Date(2021, 9, 16),
    end_date: null,
    description: '2021 was a big year for me, I got a scholarship for college, and now Im actively goes to campuss'
  },
  {
    title: 'Intern Frontend Developer',
    type: 'work',
    place: 'Skyshi Digital Indonesia',
    start_date: new Date(2022, 0, 1),
    end_date: new Date(2022, 2, 31),
    description:
      'I work as a Jr. Frontend Developer at skyshi digital, slicing design website to react component, collaborate with my colleague to build an application based on Next.js App.'
  },
  {
    title: 'Assitant Computer Lab',
    type: 'work',
    place: 'AMIK Serang',
    start_date: new Date(2021, 10, 1),
    end_date: null,
    description: `I started my job as an Assistant Lab at my College, I usually helping my colleague to deal with computers in the lab, and I often to create education contents for my College and posted it on my College's social media account`
  },
  {
    title: 'Frontend Developer',
    type: 'work',
    place: 'Skyshi Digital Indonesia',
    start_date: new Date(2022, 3, 1),
    end_date: null,
    description: `As I'm previously work as an internship, now I'm officially a Frontend Developer at Skyshi Digital Indonesia, I'm working on a project that is based on React.js, and Vue.js, slicing design to code, manipulating data from the server to serve the optimized output to the client.`
  }
]
