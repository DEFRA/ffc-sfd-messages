const { GET } = require('../constants/http-verbs')
const Wreck = require('@hapi/wreck')
const { serverConfig } = require('../config')
const { SFD_VIEW } = require('ffc-auth/scopes')
const { formatDate } = require('../utils/format-date')

module.exports = {
  method: GET,
  path: '/messages/{sbi}',
  options: {
    auth: { strategy: 'jwt', scope: [SFD_VIEW] },
    handler: async (request, h) => {
      const notificationSbi = request.params.sbi
      const response = await Wreck.get(
        `${serverConfig.messagesHost}/messages/${notificationSbi}`,
        { json: true }
      )
      const notificationData = {
        ...response.payload.data,
        requestedDate: formatDate(response.payload.data.requestedDate)
      }
      return h.view('message', { notificationData })
    }
  }
}
