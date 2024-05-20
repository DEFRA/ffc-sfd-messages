const formatDate = (dateString) => {
  const [dd, mm, yyyy] = dateString.split('-')
  const date = new Date(`${yyyy}-${mm}-${dd}`)
  const day = date.getDate()
  const month = date.toLocaleDateString('default', { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

module.exports = formatDate
