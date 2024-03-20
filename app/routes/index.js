const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('default', { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

module.exports = {
  method: GET,
  path: '/',
  options: {
    handler: async (request, h) => {
      try {
        const response = await Wreck.get(
          `${serverConfig.messagesHost}/messages`,
          {
            json: true
          }
        )
        return h.view('home', {
          messages: response.payload.map((message) => ({
            ...message,
            requestedDate: formatDate(message.requestedDate)
          }))
        })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
