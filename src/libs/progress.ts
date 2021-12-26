import ProgressBar from '@badrap/bar-of-progress'

/**
 *  intialize progress bar from `@badrap/bar-of-progress` and
 * set configuration of className, delay and size of the progressbar
 */
export const progress = new ProgressBar({
  className: 'bg-gradient-to-r from-primary-500 via-indigo-500 to-rose-500',
  delay: 0,
  size: 6
})
