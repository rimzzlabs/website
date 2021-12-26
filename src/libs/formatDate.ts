export const formatDate = (date: string) => {
  const dateObject = new Date(date)

  return dateObject.toLocaleDateString(['id-ID', 'en-EN'], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default formatDate
