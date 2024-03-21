const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { formatDate } = require('../utils/format-date')

module.exports = {
  method: GET,
  path: '/message/{id}',
  handler: async (request, h) => {
    try {
      const messageId = request.params.id
      const response = await Wreck.get(
        `${serverConfig.messagesHost}/messages/${messageId}`,
        { json: true }
      )
      const messageData = {
        ...response.payload,
        requestedDate: formatDate(response.payload.requestedDate)
      }

      console.log(messageData)
      return h.view('message', { messageData })
    } catch (error) {
      console.error(error)
    }
  }
}
