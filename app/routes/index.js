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
          `${serverConfig.messagesHost}/messages`, { json: true })
        const notificationData = response.payload.data.map((notification) => ({
          ...notification,
          requestedDate: formatDate(notification.requestedDate)
        }))
        console.log(notificationData)
        return h.view('home', { notificationData })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
