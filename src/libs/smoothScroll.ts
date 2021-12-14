// parameter e is an even onClick and scroll to some element with id
export const smoothScroll = () => {
  const html: HTMLElement = document.documentElement
  html.style.scrollBehavior = 'smooth'
  setTimeout(() => {
    html.style.scrollBehavior = 'unset'
  }, 0)
}
