import Link from 'next/link'

export function HeaderLogo() {
  return (
    <Link href='/' title='Home page' aria-label='Go to home page' className='mr-auto md:hidden'>
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='[&>rect]:dark:fill-white [&>path]:dark:fill-black'
      >
        <rect width='32' height='32' rx='4' fill='#030712' />
        <path
          className=''
          d='M15.464 20H13.532L11.864 16.832H10.664V20H8.996V13.292C8.996 12.652 9.144 12.188 9.44 11.9C9.736 11.604 10.232 11.456 10.928 11.456H12.344C13.192 11.456 13.864 11.716 14.36 12.236C14.864 12.748 15.116 13.4 15.116 14.192C15.116 14.768 14.964 15.268 14.66 15.692C14.364 16.108 13.996 16.396 13.556 16.556L15.464 20ZM12.236 15.44C12.588 15.44 12.876 15.32 13.1 15.08C13.332 14.832 13.448 14.528 13.448 14.168C13.448 13.8 13.336 13.504 13.112 13.28C12.896 13.056 12.604 12.944 12.236 12.944H11.408C10.912 12.944 10.664 13.196 10.664 13.7V15.44H12.236ZM21.1676 16.688H22.7156C22.7156 17.776 22.4436 18.612 21.8996 19.196C21.3556 19.78 20.5876 20.072 19.5956 20.072C17.4116 20.072 16.3196 18.788 16.3196 16.22V15.5C16.3196 13.476 16.8796 12.208 17.9996 11.696C18.4396 11.488 18.9716 11.384 19.5956 11.384C20.5076 11.384 21.2476 11.636 21.8156 12.14C22.3916 12.636 22.6796 13.356 22.6796 14.3H21.1196C21.0316 13.828 20.8756 13.472 20.6516 13.232C20.4276 12.992 20.0756 12.872 19.5956 12.872C19.0356 12.872 18.6196 13.048 18.3476 13.4C18.1556 13.648 18.0436 14.072 18.0116 14.672C17.9956 14.864 17.9876 15.124 17.9876 15.452V16.196C17.9876 17.116 18.1156 17.744 18.3716 18.08C18.6356 18.416 19.0436 18.584 19.5956 18.584C20.1556 18.584 20.5396 18.432 20.7476 18.128C20.9636 17.816 21.1036 17.336 21.1676 16.688Z'
          fill='white'
        />
      </svg>

      <span className='sr-only'>Go to home page</span>
    </Link>
  )
}