import {
  IoMail,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoFacebook
} from 'react-icons/io5'

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

export const metaPages = {
  home: {
    title: 'Home',
    description: 'Home page description',
    image: 'https://example.com/image.jpg',
    url: 'https://example.com/'
  },
  article: {
    title: 'Article',
    description: 'Article page description',
    image: 'https://example.com/image.jpg',
    url: 'https://example.com/'
  }
}

// often activites

export const spareTime = [
  {
    title: 'Watch Anime',
    description:
      'I just love to watch anime instead of a news about my country, Anime is the only thing that I can watch, I enjoy watching it, because it is only a show that nice to watch and enjoyable to watch.'
  },
  {
    title: 'Read article about IT',
    description:
      'As a Developer, Read devpost daily is something that I should do in my opinion, everyday people share about they thought, and it is very interested to read and give me a new insight about Information Technology'
  },
  {
    title: 'Drink Coffee',
    description:
      'this is very important because my only precious fuel is only a coffee (JK lol).'
  },
  {
    title: 'Play Game',
    description:
      "I'm not that guy who loves to playing game for a long time, but sometimes it' s fun "
  }
]
