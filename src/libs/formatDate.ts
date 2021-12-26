/**
 * function that will format the parameter to date of year, month and day
 * @param date a date of string
 * @returns string
 */
export const formatDate = (date: string) => {
  const dateObject = new Date(date)

  return dateObject.toLocaleDateString(['id-ID', 'en-EN'], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default formatDate
