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
  path: '/{id}',
  handler: async (request, h) => {
    try {
      const messageId = request.params.id
      const response = await Wreck.get(
        `${serverConfig.messagesHost}/messages/${messageId}`,
        { json: true }
      )
      const message = {
        ...response.payload,
        requestedDate: formatDate(response.payload.requestedDate)
      }
      return h.view('message-view', { message })
    } catch (error) {
      console.error(error)
    }
  }
}
