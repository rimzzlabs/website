import { TechincalType } from '@/types/customType'

import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5'

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
    description: `I am an 18 year old who is passionate about Computer Science and Web Development, I'm so excited about future Web Technology, love to learn new things and JavaScript. fun fact: coffee sometimes can help me solve my problem when debugging.`,
    imageURL: 'https://ik.imagekit.io/mlnzyx/personal_web-og/homepage_8O1cNMK7I.png?updatedAt=1639665256919',
    imageALT: 'Rizki Maulana Citra Home page',
    url: 'https://rizkicitra.my.id'
  },
  article: {
    title: 'Article',
    description:
      'I talk about anything that interest me, Web Development, Internet, as well as Social Life based on my personal view..',
    imageURL: 'https://ik.imagekit.io/mlnzyx/personal_web-og/homepage_8O1cNMK7I.png?updatedAt=1639665256919',
    imageALT: 'Rizki Maulana Citra Article page',
    url: 'https://rizkicitra.my.id/article'
  },
  additional: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'white'
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Rizki Maulana Citra'
    }
  ]
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
      `I have experience with HTML and CSS for 1 Year, then I also learned SASS as a super power of native CSS, and now, the main CSS Framework that I use to style websites is using Tailwind CSS.`,
      'Markdown is a simple way to write text that can be converted to HTML, and everyone know how to use it.'
    ]
  },
  {
    title: 'JavaScript and TypeScript',
    Icon: ['js', 'ts'],
    description: [
      `I learned JavaScript about 10 Months ago, and I quite like this language, then TypeScript came along, I then learned TypeScript about 3 Months ago.`,
      `TypeScript is very helpful in the development process, the static typing feature is the feature I like the most.`
    ]
  },
  {
    title: 'React and Next.js',
    Icon: ['react', 'nextjs'],
    description: [
      `React is the coolest Library I've ever used, React is a library for building user interfaces, I learned React in June 2021.`,
      `And Next.js is a React Framework that brings very cool features to developers, such as SSG, and SSR, I learned Next.js in August 2021, and Next.js has become my main Framework building an app.`
    ]
  },
  {
    title: 'Backend Environment',
    Icon: ['nodejs', 'express'],
    description: [
      `Well, I don't think this should be here, but even so, I'm familiar with Node.js, and Express`,
      `I started learning Node.js and Express.js in October 2021, but Backend environment doesn't seem as easy as I thought, I need to be more enthusiastic, and until now, I'm learning Node.js fundamentals`
    ]
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
