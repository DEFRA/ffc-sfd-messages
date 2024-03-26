const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { formatDate } = require('../utils/format-date')

module.exports = {
  method: GET,
  path: '/message/{id}',
  handler: async (request, h) => {
    try {
      const notificationId = request.params.id
      const response = await Wreck.get(
        `${serverConfig.messagesHost}/messages/${notificationId}`,
        { json: true }
      )
      const notificationData = {
        ...response.payload.data,
        requestedDate: formatDate(response.payload.data.requestedDate)
      }
      console.log(notificationData)

      return h.view('message', { notificationData })
    } catch (error) {
      console.error(error)
    }
  }
}
