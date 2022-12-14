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
  `Knowledgeable in web standards and best practices, including HTML, CSS, and JavaScript. Also use TypeScript for type safety, and implement best practices to ensure the highest level of quality and reliability.`,
  `Implement React Query to synchronize data between the server and client, ensuring that users have access to the latest information while maintaining optimal application performance."`,
  `Proficient in frontend technologies, particularly within the React.js ecosystem, including React.js, and Next.js.`,
  `Skilled in UI development, accessibility, user experience, and performance optimization.`,
  `Able to adapt to new technologies and maintain best practices. Committed to delivering high-quality, user-centered, and scalable web applications.`,
  `Familiar with design tools such as Figma.`
]

export const KEY_SKILLS = [
  `As a professional, I am proficient in Continuous Integration & Continuous Deployment, and I am well-versed in the Design Thinking Process.`,
  `I am also skilled in Critical Thinking & Problem Solving, and I am committed to creating accessible Frontend Applications.`,
  `I am highly adaptable and thrive in team-oriented environments. I am also known for my creativity and ability to approach tasks and challenges with an innovative mindset.`
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
  `Experienced frontend developer with a strong background in modern web technologies, particularly within the React.js ecosystem. Skilled in UI development, accessibility, user experience, and performance optimization, with a focus on creating scalable, optimized, and user-friendly applications.`,
  `Adept at working in agile environments and collaborating with teams to drive process efficiencies and deliver high-quality results. Committed to delivering exceptional user experiences and maximizing the impact of web applications.`,
  `Continuously seeking to learn and explore new technologies and best practices, while also staying focused on meeting responsibilities and delivering results.`
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
