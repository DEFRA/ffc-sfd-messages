const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('default', { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

module.exports = {
  formatDate
}
