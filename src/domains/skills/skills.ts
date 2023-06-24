import { type Skills } from './type'
import { createSkills } from './utils'

import * as Icon from 'react-icons/si'

const Frameworks = createSkills({
  titles: ['Next.js', 'Vue.js', 'Angular', 'Figma'],
  Icons: [Icon.SiNextdotjs, Icon.SiVuedotjs, Icon.SiAngular, Icon.SiFigma],
})
const Languages = createSkills({
  titles: ['HTML', 'CSS', 'Javascript', 'TypeScript'],
  Icons: [Icon.SiHtml5, Icon.SiCss3, Icon.SiJavascript, Icon.SiTypescript],
})

const Libraries = createSkills({
  titles: ['React', 'SCSS', 'Bootstrap', 'Tailwind CSS', 'Uno CSS', 'Chart.js'],
  Icons: [
    Icon.SiReact,
    Icon.SiSass,
    Icon.SiBootstrap,
    Icon.SiTailwindcss,
    Icon.SiUnocss,
    Icon.SiChartdotjs,
  ],
})

const ReactEcosystem = createSkills({
  titles: [
    'React',
    'Next.js',
    'Vite',
    'Create React App',
    'Tanstack Query',
    'React Hook Form',
    'React Router',
    'Framer Motion',
    'Headless UI',
    'Styled Components',
    'Redux',
  ],
  Icons: [
    Icon.SiReact,
    Icon.SiNextdotjs,
    Icon.SiVite,
    Icon.SiCreatereactapp,
    Icon.SiReactquery,
    Icon.SiReacthookform,
    Icon.SiReactrouter,
    Icon.SiFramer,
    Icon.SiHeadlessui,
    Icon.SiStyledcomponents,
    Icon.SiRedux,
  ],
})

const Learnings = createSkills({
  titles: ['Kotlin', 'Android Development'],
  Icons: [Icon.SiKotlin, Icon.SiAndroid],
})

export const skills: Skills = {
  'React Ecosystem': ReactEcosystem,
  Languages,
  Libraries,
  Frameworks,
  'I am Learning': Learnings,
}
