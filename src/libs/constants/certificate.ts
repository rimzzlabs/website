type Albums = Array<{ title: string; src: string }>

const IMG_URL = 'https://ik.imagekit.io/mlnzyx/certificate'

const ALBUMS: Albums = [
  { title: 'Basic Web Programming - Dicoding', src: `${IMG_URL}/bdpw.png` },
  { title: 'Beginner Frontend Guide - Dicoding', src: `${IMG_URL}/bmfwp.png` },
  { title: 'Beginner JavaScript Guide - Dicoding', src: `${IMG_URL}/bdpj.png` },
  { title: 'Frontend Fundamental Guide - Dicoding', src: `${IMG_URL}/bffwd.png` },
  { title: 'HTML & CSS course - Progate', src: `${IMG_URL}/progate-htmlcss.png` },
  { title: 'SASS course - Progate', src: `${IMG_URL}/progate-sass.png` },
  { title: 'Git course - Progate', src: `${IMG_URL}/progate-git.png` },
  { title: 'PHP course - Progate', src: `${IMG_URL}/progate-php.png` },
  { title: 'JavaScript course - Progate', src: `${IMG_URL}/progate-js.png` },
  { title: 'React.js course - Progate', src: `${IMG_URL}/progate-react.png` }
]

export default ALBUMS
