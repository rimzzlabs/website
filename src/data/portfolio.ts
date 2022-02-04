export interface PortfolioProps {
  title: string
  src: string
  tags: Array<string>
  description: string
  url: {
    github: string
    live: string
  }
}

const portfolio: Array<PortfolioProps> = [
  {
    title: 'Tolisinih',
    src: 'https://ik.imagekit.io/mlnzyx/portfolio_ss/thumbs_WygKepmFJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1636639029879',
    tags: ['React', 'Redux', 'Tailwind CSS'],
    description: 'A simple todo app based on GetHired DevCode Challenge',
    url: {
      github: 'https://github.com/rizkimcitra/tolisinih',
      live: 'https://tolisinih.web.app/'
    }
  },
  {
    title: 'Work.ly',
    src: 'https://ik.imagekit.io/mlnzyx/portfolio_ss/workly_6PcesW2eU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1636641668597',
    tags: ['React', 'Tailwind CSS'],
    description: 'Slicing design with tailwind css, lazy loading image, and more',
    url: {
      github: 'https://github.com/rizkimcitra/work.ly',
      live: 'https://work-ly.vercel.app/'
    }
  },
  {
    title: 'Genpass',
    src: 'https://ik.imagekit.io/mlnzyx/portfolio_ss/genpass_1__Fn3Y-evzyLP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1639123715413',
    tags: ['JavaScript', 'Tailwind CSS'],
    description: 'Password generator with Javascript and Tailwind CSS',
    url: {
      github: 'https://github.com/rizkimcitra/genpass',
      live: 'https://genapass.vercel.app/'
    }
  },
  {
    title: 'Kalku',
    src: 'https://ik.imagekit.io/mlnzyx/portfolio_ss/kalku_HrR86az6T.png?ik-sdk-version=javascript-1.4.3&updatedAt=1639123661216',
    tags: ['JavaScript', 'Tailwind CSS'],
    description: 'Calculator with Javascript and Tailwind CSS',
    url: {
      github: 'https://github.com/rizkimcitra/kalku',
      live: 'https://rizkimcitra.github.io/kalku/'
    }
  }
]

export default portfolio
