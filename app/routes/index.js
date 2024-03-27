const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { formatDate } = require('../utils/format-date')

module.exports = {
  method: GET,
  path: '/',
  options: {
    auth: { strategy: 'jwt', scope: [SFD_VIEW] },
    handler: async (request, h) => {
      try {
        const response = await Wreck.get(
          `${serverConfig.messagesHost}/messages`,
          { json: true }
        )
        const notificationData = response.payload.data.map((notification) => ({
          ...notification,
          requestedDate: formatDate(notification.requestedDate)
        }))
        return h.view('home', { notificationData })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
