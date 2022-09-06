import SOCIAL from './social'

export const HEADLINE = {
  name: 'RIZKI MAULANA CITRA',
  role: 'Frontend Engineer'
}

export const LINKS: typeof SOCIAL = [
  ...SOCIAL.filter((s) => s.title !== 'Telegram'),
  {
    href: 'https://rizkicitra.dev',
    title: 'Website'
  },
  {
    href: 'https://rizkicitra.dev/blog',
    title: 'Blog'
  }
]

export const SKILLS = [
  {
    name: 'Technologies',
    list: [
      'React',
      'Vite',
      'Next.js',
      'React Query',
      'Redux',
      'Jotai',
      'Zustand',
      'Tailwind CSS',
      'Vuejs',
      'Angular',
      'Supabase',
      'Firebase',
      'Vercel',
      'Node.js'
    ]
  },
  { name: 'Programming Languages', list: ['HTML', 'CSS/SCSS', 'JavaScript', 'TypeScript'] }
]

export const EXPERIENCE = [
  {
    companyName: 'Skyshi Digital Indonesia',
    role: 'Frontend Engineer',
    period: {
      start: 'January, 2022',
      end: 'Present'
    },
    lists: [
      `Build ticket purchasing web app with GlobalTix on <a href='https://baliekajaya.com/'>Baliekajaya</a>, built with Angular.`,
      `Build ticket purchasing web app with GlobalTix on <a href='https://www.baligilitickets.com/'>Baligiliticket</a>, built with Angular.`,
      `Developing survey based app with AcuityQuick, using React and Tailwind CSS.`
    ]
  },
  {
    companyName: 'Skyshi Digital Indonesia',
    role: 'Frontend Engineer Intern',
    period: {
      start: 'October, 2021',
      end: 'January, 2022'
    },
    lists: [
      `Slicing design from figma to React component for CV template on <a href='https://gethired.id/cv-online'>gethired.id</a>.`,
      `Develop CV-Maker based app with React and Vuejs with requirement of sustainable user experience and user interface.`
    ]
  }
]

type Education = Array<{
  school: string
  period: { start: string; end: string }
  paragraphs: string[]
  list?: {
    title: string
    listItem: string[]
  }
}>

export const EDUCATION: Education = [
  {
    school: 'Computer and Informatics Management Academy of Serang',
    period: {
      start: 'September, 2021',
      end: 'Present'
    },
    paragraphs: ['Semester 3 of Informatics Management Student.', 'Current GPA: 3.50.']
  },
  {
    school: 'Vocational High School of 8 Pandeglang',
    period: {
      start: 'July, 2018',
      end: 'May, 2021'
    },
    paragraphs: ['Graduated in May, 2021.'],
    list: {
      title: 'Honorable Award:',
      listItem: ['Student Competency and Expertise Test on building web app with PHP and MySQL.']
    }
  }
]
