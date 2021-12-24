export const formatDate = (date: string) => {
  const dateObject = new Date(date)

  return dateObject.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default formatDate
