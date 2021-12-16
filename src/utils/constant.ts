import {
  IoMail,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoFacebook
} from 'react-icons/io5'
import { TechincalType } from '@/types/customType'

/**
 * @description Routes, defines the routes of the pages, if you add a new route the page would also updated
 */
export const routes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/article',
    name: 'Article'
  }
]

/**
 * @description links mean your social media, and this would be used in the `Footer` component, look up to the `src/components/Footer.tsx`.
 * there you would fine this array being used to populate the data inside the `Footer` component.
 */
export const links = [
  {
    name: 'email',
    url: "mailto:rmaulana.citra@gmail.com?subject=Hi Rizki!, let's talk about yourself",
    Icon: IoMail
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/rizkimcitra',
    Icon: IoLogoLinkedin
  },
  {
    name: 'GitHub',
    url: 'https://github.com/rizkimcitra',
    Icon: IoLogoGithub
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/rizkimcitraa',
    Icon: IoLogoFacebook
  }
]

/**
 * @description an object of object, this is the meta data of each page, currently just for mockup purpose.
 * later on I will not prefer using this as it is not scalable and very confusing
 */
export const metaPages = {
  home: {
    title: 'Home',
    description: `I am a 18 Y.O flexible guy who loves to learn new things, I like to read article about science and technology. I couldn't help with the science tho, because I have no idea how it works, but I still love to read and learn a bit about it.`,
    image:
      'https://ik.imagekit.io/mlnzyx/personal_web-og/homepage_8O1cNMK7I.png?updatedAt=1639665256919',
    url: 'https://rizkicitra.my.id'
  },
  article: {
    title: 'Article',
    description:
      'In this page you can see my article, I often to write about my daily life and about my hobbies.',
    image:
      'https://ik.imagekit.io/mlnzyx/personal_web-og/homepage_8O1cNMK7I.png?updatedAt=1639665256919',
    url: 'https://rizkicitra.my.id/article'
  }
}

/**
 * @description This is a constant for the type of Technical Skills, all those skills are stored here,
 * modify this to match with your own skills, or you can add more items in the array, please don't foget to check the type of the items
 * in the `src/types/customType.ts`
 */
export const TechincalSkill: Array<TechincalType> = [
  {
    title: 'Markup and Stylesheet',
    Icon: ['markdown', 'html', 'css', 'sass', 'tailwindcss'],
    description: [
      `I have 1 Year experience with HTML and CSS, I have also learn SASS to improve my writing stylesheet, but my main tools of using Stylesheet is TailwindCSS.`,
      'Markdown is a simple way to write text that can be converted to HTML, and everyone know how to use it.'
    ]
  },
  {
    title: 'JavaScript and TypeScript',
    Icon: ['js', 'ts'],
    description: `I have 1 Year experience with JavaScript, and about 3 Months with TypeScript, TypeScript is very heplful when it comes to writing code, it static type feature are awesome, and I am currently using it`
  },
  {
    title: 'React and Next.js',
    Icon: ['react', 'nextjs'],
    description: `I have 10 Months experience with React, and about 6 Months with Next.js, Next.js is a framework that is very easy to use, and I am currently using it as my main go to frontend framework.`
  },
  {
    title: 'Backend Environment',
    Icon: ['nodejs', 'express', 'strapi', 'php'],
    description: `Although this should be not here, I've recently learning and doing some backend development, even though it's on localhost, I'm made my first API with express and I'm still learning to become a Fullstack JavaScript.`
  }
]

/**
 * @description list of hobies, you can add your own or even modify this, such as adding description or whatever you want
 * But don't forget to check HobbiesCard component to match with your customization on `src/component/cards` folder
 */
export const hobies = [
  {
    title: 'Watch Movies or Animes',
    icon: 'tv'
  },
  {
    title: 'Read Techincal Article',
    icon: 'book'
  },
  {
    title: 'Try something new',
    icon: 'code'
  },
  {
    title: 'Playing Games',
    icon: 'gamepad'
  }
]
