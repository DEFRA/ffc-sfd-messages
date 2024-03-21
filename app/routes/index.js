const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { formatDate } = require('../utils/format-date')

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
        const messageData = {
          messages: response.payload.map((message) => ({
            ...message,
            requestedDate: formatDate(message.requestedDate)
          }))
        }
        return h.view('home', { messageData })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
