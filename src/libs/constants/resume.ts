import SOCIAL from './social'

import { Experience } from 'rizkicitra'

export const HEADLINE = {
  name: 'Rizki Maulana Citra'
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
      'React.js',
      'Next.js',
      'Vite.js',
      'React Query',
      'Redux',
      'Jotai',
      'Zustand',
      'Tailwind CSS',
      'Vue.js',
      'Angular',
      'Supabase',
      'Firebase',
      'Vercel',
      'Node.js'
    ]
  },
  { name: 'Programming Languages', list: ['HTML', 'CSS/SCSS', 'JavaScript', 'TypeScript'] }
]

export const KEY_SKILLS = [
  'Continuous Integration & Continuous Deployment',
  'Design Thinking Process',
  'Critical Thinking & Problem Solving',
  'Accessible Frontend Application',
  'Adaptability',
  'Team Player',
  'Creativity'
]

export const EXPERIENCE: Experience[] = [
  {
    companyName: 'Skyshi Digital Indonesia',
    role: 'Frontend Developer',
    period: {
      start: 'April, 2022',
      end: 'Present'
    },
    lists: [
      `Responsible to build internal and external application, mostly external client from local to international with modern web app technology with React and Next.js`,
      `Responsible to deliver fast and optimized application, write browser backward compatibility with babel, deliver responsive-friendly and cross browser application with autoprefixer and postcss.`,
      `Develop and maintain features from low to high impact, make sure to deliver high user experience frontend application that passed web accessibility standard.`,
      `Write clean and maintainable code with TypeScript.`
    ]
  },
  {
    companyName: 'Skyshi Digital Indonesia',
    role: 'Frontend Developer Intern',
    period: {
      start: 'January, 2021',
      end: 'March, 2022'
    },
    lists: [
      `Responsible to develop specific features on internal project using React.js, Vue.js and Chakra UI.`,
      `Deliver responsive-friendly and cross browser application with autoprefixer and postcss.`,
      `Slicing design from figma to React component for CV template on <a href='https://gethired.id/cv-online'>gethired.id</a>.`
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
    paragraphs: ['Choosing Software Engineering as my main major.', 'Graduated in May, 2021.']
  }
]

export const SUMMARY = [
  `Frontend Developer <em>(especially on modern web technology)</em>.`,
  'Adept at leveraging <strong>Sprint</strong> and <strong>Agile</strong> methodologies to drive process efficiencies.',
  `Focused to frontend environment with strong Frontend core skills, but also has familiarity with other languages and tools.`,
  'Deploy optimized apps with scalable user interface, user experience, and user accessibility based on design thinking process.'
]

export const LANGUAGES = [
  {
    title: 'Indonesia',
    level: 'Native, Fluent'
  },
  {
    title: 'English',
    level: 'Limited working proficiency'
  }
]
