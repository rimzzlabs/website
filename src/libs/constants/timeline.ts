export interface Timeline {
  title: string
  description: string
  place: string | null
  start_date: Date
  end_date: Date | null
}

export const timeline: Array<Timeline> = [
  {
    title: 'High School',
    place: 'SMK Negeri 8 Pandeglang',
    start_date: new Date(2018, 5, 14),
    end_date: new Date(2021, 4, 28),
    description:
      'Entering High School, it was a pleasant time when I was in High School, learning all of those fundamentals such as logical gate, and I even play around with Java for 2 semesters'
  },
  {
    title: 'College',
    place: 'AMIK Serang',
    start_date: new Date(2021, 9, 16),
    end_date: null,
    description: '2021 was a big year for me, I got a scholarship for college, and now Im actively goes to campuss'
  },
  {
    title: 'Intern Frontend Developer',
    place: 'Skyshi Digital Indonesia',
    start_date: new Date(2021, 11, 24),
    end_date: null,
    description:
      'I work as a Jr. Frontend Developer at skyshi digital, slicing design website to react component, collaborate with my colleague to build an application based on Next.js App, and also foo bar buzz bizz, lorem hello'
  },
  {
    title: 'Assitant Computer Lab',
    place: 'AMIK Serang',
    start_date: new Date(2021, 10, 1),
    end_date: null,
    description: `I started my job as an Assistant Lab at my College, there I usually helping my colleague to deal with computers in the lab, and I often to create education contents for my College and then posted it on my College's social media account`
  }
]
